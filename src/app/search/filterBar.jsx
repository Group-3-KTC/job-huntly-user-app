"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useJobSearchStore } from "@/store/jobSearchStore";
import clsx from "clsx";

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

    const toggleValue = (listName, value) => {
        setFilters({
            ...filters,
            [listName]: filters[listName].includes(value)
                ? filters[listName].filter((v) => v !== value)
                : [...filters[listName], value],
        });
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(
                    "https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/jobs"
                );
                const data = await response.json();

                const categorySet = new Set();
                const levelSet = new Set();
                const workTypeSet = new Set();
                const skillSet = new Set();

                data.forEach((job) => {
                    const { category, level, workType, skill } = job;

                    (Array.isArray(category) ? category : [category]).forEach(
                        (c) => categorySet.add(c)
                    );
                    (Array.isArray(level) ? level : [level]).forEach((l) =>
                        levelSet.add(l)
                    );
                    (Array.isArray(workType) ? workType : [workType]).forEach(
                        (w) => workTypeSet.add(w)
                    );
                    (Array.isArray(skill) ? skill : [skill]).forEach((s) =>
                        skillSet.add(s)
                    );
                });

                setAllCategories([...categorySet]);
                setAllLevels([...levelSet]);
                setAllWorkTypes([...workTypeSet]);
                setAllSkills([...skillSet]);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    const renderTags = (items, listName, colorClass, selectedBg, textClass) => (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => {
                const isSelected = filters[listName].includes(item);
                return (
                    <div
                        key={item}
                        onClick={() => toggleValue(listName, item)}
                        className={clsx(
                            "px-3 py-1 text-sm rounded-full cursor-pointer border transition select-none",
                            colorClass,
                            isSelected
                                ? `${selectedBg} ${textClass} font-medium`
                                : "bg-white text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow">
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
                {showSkills &&
                    renderTags(
                        allSkills,
                        "skills",
                        "border-blue-700",
                        "bg-blue-100",
                        "text-blue-700"
                    )}
            </div>
        </div>
    );
}
