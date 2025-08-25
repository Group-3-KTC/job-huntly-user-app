"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useJobSearchStore } from "@/store/jobSearchStore";
import clsx from "clsx";

const API_BASE = "http://18.142.226.139:8080/api/v1";

async function fetchJSON(url, signal) {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export default function FilterBar() {
    const [allCategories, setAllCategories] = useState([]);
    const [allLevels, setAllLevels] = useState([]);
    const [allWorkTypes, setAllWorkTypes] = useState([]);
    const [allSkills, setAllSkills] = useState([]);

    const [showCategories, setShowCategories] = useState(false);
    const [showLevels, setShowLevels] = useState(false);
    const [showWorkTypes, setShowWorkTypes] = useState(false);
    const [showSkills, setShowSkills] = useState(false);

    const { filters, setFilters } = useJobSearchStore();

    const toggleValue = useCallback(
        (listName, value) => {
            setFilters({
                ...filters,
                [listName]: filters[listName].includes(value)
                    ? filters[listName].filter((v) => v !== value)
                    : [...filters[listName], value],
            });
        },
        [filters, setFilters]
    );

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const data = await fetchJSON(
                    `${API_BASE}/category`,
                    controller.signal
                );
                const names = (Array.isArray(data) ? data : []).map(
                    (c) => c?.name ?? c
                );
                setAllCategories(Array.from(new Set(names.filter(Boolean))));
            } catch (e) {
                if (
                    e.name !== "AbortError" &&
                    e.message !== "signal is aborted without reason"
                ) {
                    console.error("Failed to fetch categories:", e);
                }
            }
        })();
        return () => {
            if (!controller.signal.aborted) controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const data = await fetchJSON(
                    `${API_BASE}/levels`,
                    controller.signal
                );
                const names = (Array.isArray(data) ? data : []).map(
                    (l) => l?.name ?? l
                );
                setAllLevels(Array.from(new Set(names.filter(Boolean))));
            } catch (e) {
                if (
                    e.name !== "AbortError" &&
                    e.message !== "signal is aborted without reason"
                ) {
                    console.error("Failed to fetch levels:", e);
                }
            }
        })();
        return () => {
            if (!controller.signal.aborted) controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const data = await fetchJSON(
                    `${API_BASE}/worktypes`,
                    controller.signal
                );
                const names = (Array.isArray(data) ? data : []).map(
                    (w) => w?.name ?? w
                );
                setAllWorkTypes(Array.from(new Set(names.filter(Boolean))));
            } catch (e) {
                if (
                    e.name !== "AbortError" &&
                    e.message !== "signal is aborted without reason"
                ) {
                    console.error("Failed to fetch work types:", e);
                }
            }
        })();
        return () => {
            if (!controller.signal.aborted) controller.abort();
        };
    }, []);

    // Load Skills theo category
    useEffect(() => {
        if (!filters.categories?.length) {
            setAllSkills([]);
            return;
        }

        const controller = new AbortController();
        (async () => {
            try {
                // Có thể chọn nhiều category → gọi song song, union kết quả
                const queries = filters.categories.map((cateName) =>
                    fetchJSON(
                        `${API_BASE}/skill/by-category?name=${encodeURIComponent(
                            cateName
                        )}`,
                        controller.signal
                    ).catch(() => [])
                );
                const lists = await Promise.all(queries);
                const merged = lists.flat().map((s) => s?.name ?? s);
                const unique = Array.from(new Set(merged.filter(Boolean)));
                setAllSkills(unique);
            } catch (e) {
                if (e.name !== "AbortError") {
                    console.error("Failed to fetch skills by category:", e);
                }
            }
        })();

        return () => controller.abort();
    }, [filters.categories]);

    const renderTags = useCallback(
        (items, listName, colorClass, selectedBg, textClass) => (
            <div className="flex flex-wrap gap-2">
                {items.map((item) => {
                    const label = typeof item === "string" ? item : item?.name;
                    if (!label) return null;
                    const isSelected = filters[listName].includes(label);
                    return (
                        <div
                            key={label}
                            onClick={() => toggleValue(listName, label)}
                            className={clsx(
                                "px-3 py-1 text-sm rounded-full cursor-pointer border transition select-none",
                                colorClass,
                                isSelected
                                    ? `${selectedBg} ${textClass} font-medium`
                                    : "bg-white text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            {label}
                        </div>
                    );
                })}
            </div>
        ),
        [filters, toggleValue]
    );

    // Nếu chưa chọn category và người dùng bật Skill section
    const shouldShowPickCategoryHint = useMemo(
        () =>
            showSkills &&
            (!filters.categories || filters.categories.length === 0),
        [showSkills, filters.categories]
    );

    return (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow">
            {/* Work Types */}
            <div>
                <div
                    onClick={() => setShowWorkTypes(!showWorkTypes)}
                    className="flex justify-between items-center cursor-pointer font-semibold mb-2"
                >
                    <span>Work Type</span>
                    {showWorkTypes ? (
                        <ChevronUp size={18} />
                    ) : (
                        <ChevronDown size={18} />
                    )}
                </div>
                {showWorkTypes &&
                    renderTags(
                        allWorkTypes,
                        "workTypes",
                        "border-yellow-500",
                        "bg-yellow-100",
                        "text-yellow-700"
                    )}
            </div>

            {/* Levels */}
            <div>
                <div
                    onClick={() => setShowLevels(!showLevels)}
                    className="flex justify-between items-center cursor-pointer font-semibold mb-2"
                >
                    <span>Levels</span>
                    {showLevels ? (
                        <ChevronUp size={18} />
                    ) : (
                        <ChevronDown size={18} />
                    )}
                </div>
                {showLevels &&
                    renderTags(
                        allLevels,
                        "levels",
                        "border-green-500",
                        "bg-green-100",
                        "text-green-700"
                    )}
            </div>

            {/* Categories */}
            <div>
                <div
                    onClick={() => setShowCategories(!showCategories)}
                    className="flex justify-between items-center cursor-pointer font-semibold mb-2"
                >
                    <span>Categories</span>
                    {showCategories ? (
                        <ChevronUp size={18} />
                    ) : (
                        <ChevronDown size={18} />
                    )}
                </div>
                {showCategories &&
                    renderTags(
                        allCategories,
                        "categories",
                        "border-purple-500",
                        "bg-purple-100",
                        "text-purple-700"
                    )}
            </div>

            {/* Skills (phụ thuộc Category) */}
            <div>
                <div
                    onClick={() => setShowSkills(!showSkills)}
                    className="flex justify-between items-center cursor-pointer font-semibold mb-2"
                >
                    <span>Skills</span>
                    {showSkills ? (
                        <ChevronUp size={18} />
                    ) : (
                        <ChevronDown size={18} />
                    )}
                </div>

                {shouldShowPickCategoryHint ? (
                    <p className="text-sm text-gray-500">
                        Vui lòng chọn ít nhất 1 Category để hiển thị danh sách
                        Skills.
                    </p>
                ) : (
                    showSkills &&
                    renderTags(
                        allSkills,
                        "skills",
                        "border-blue-700",
                        "bg-blue-100",
                        "text-blue-700"
                    )
                )}
            </div>
        </div>
    );
}
