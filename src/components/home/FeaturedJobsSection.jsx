"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, MapPin } from "lucide-react";
import { API_CONFIG } from "@/lib/config";

const NEXT_PUBLIC_API_PROXY_TARGET = process.env.NEXT_PUBLIC_API_PROXY_TARGET;
const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_BASE = NEXT_PUBLIC_API_PROXY_TARGET + NEXT_PUBLIC_API_BASE_URL;

function typeColorClass(type) {
    // Ghép màu badge theo work type (fallback nhã)
    switch ((type || "").toUpperCase()) {
        case "FULL-TIME":
        case "FULL TIME":
            return "bg-blue-100 text-blue-800";
        case "PART-TIME":
        case "PART TIME":
            return "bg-green-100 text-green-800";
        case "INTERNSHIP":
            return "bg-purple-100 text-purple-800";
        case "CONTRACT":
            return "bg-yellow-100 text-yellow-800";
        case "REMOTE":
            return "bg-teal-100 text-teal-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

async function fetchJobs(signal) {
    // Lấy tối đa 12 job từ trang đầu; có thể thêm sort nếu backend hỗ trợ
    const url = `${API_BASE}/job/all?size=12&page=0`;
    const res = await fetch(url, { signal, credentials: "include" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

// Chuẩn hóa record từ API sang model cho UI
function normalizeJob(j) {
    const companyName = j?.company?.company_name || "Unknown Company";
    const logo = j?.company?.avatar || "/logo-placeholder.png";
    const firstWorkType =
        Array.isArray(j?.work_type_names) && j.work_type_names.length > 0
            ? j.work_type_names[0]
            : null;

    return {
        id: j?.id,
        title: j?.title || "Untitled",
        company: companyName,
        logo,
        salary: j?.salaryDisplay || "Thỏa thuận",
        location: j?.location || "—",
        type: firstWorkType || "OTHER",
        typeColor: typeColorClass(firstWorkType),
        // Chuẩn bị sẵn cho tương lai (ưu tiên boost)
        boosted: !!j?.boosted, // boolean (nếu backend thêm)
        boostLevel: Number(j?.boostLevel) || 0, // số càng lớn càng ưu tiên
    };
}

// Sắp xếp có ưu tiên boosted (nếu backend đã gửi)
function sortWithBoost(jobs) {
    return [...jobs].sort((a, b) => {
        // Ưu tiên boosted true > false
        if (a.boosted !== b.boosted) return a.boosted ? -1 : 1;
        // Nếu có boostLevel thì level cao hơn đứng trước
        if (a.boostLevel !== b.boostLevel) return b.boostLevel - a.boostLevel;
        // Giữ nguyên thứ tự còn lại
        return 0;
    });
}

const FeaturedJobsSection = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                setLoading(true);
                const data = await fetchJobs(controller.signal);
                const items = Array.isArray(data?.content) ? data.content : [];
                const normalized = items.map(normalizeJob);
                // Ưu tiên boosted (nếu có), rồi giới hạn 12
                const finalList = sortWithBoost(normalized).slice(0, 12);
                setJobs(finalList);
            } catch (e) {
                if (e.name !== "AbortError")
                    setErr(e.message || "Failed to load");
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, []);

    const body = useMemo(() => {
        if (loading) {
            // Skeleton nhẹ
            return (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="p-6 bg-white border border-gray-200 rounded-lg animate-pulse"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-40 h-4 bg-gray-200 rounded" />
                                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                            </div>
                            <div className="w-24 h-5 mb-2 bg-gray-200 rounded" />
                            <div className="w-36 h-3 mb-4 bg-gray-200 rounded" />
                            <div className="flex items-center">
                                <div className="w-10 h-10 mr-3 bg-gray-200 rounded-full" />
                                <div className="flex-1">
                                    <div className="w-32 h-4 mb-2 bg-gray-200 rounded" />
                                    <div className="w-24 h-3 bg-gray-200 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (err) {
            return (
                <div className="p-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
                    Không thể tải danh sách việc làm. {err}
                </div>
            );
        }

        if (jobs.length === 0) {
            return (
                <div className="p-6 text-sm text-gray-600 bg-white border border-gray-200 rounded">
                    Hiện chưa có việc làm phù hợp hiển thị.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="relative p-6 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-lg"
                    >
                        {/* Badge BOOSTED nếu có */}
                        {job.boosted && (
                            <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                BOOSTED
                            </span>
                        )}

                        <div className="flex items-start justify-between mb-4">
                            <div className="pr-4">
                                <h3 className="mb-2 text-base font-semibold text-gray-900 line-clamp-2">
                                    <Link
                                        href={`/jobs/${job.id}`}
                                        className="hover:underline"
                                    >
                                        {job.title}
                                    </Link>
                                </h3>

                                <section
                                    className={`${job.typeColor} inline-block px-2 py-1 rounded-full text-xs font-semibold`}
                                >
                                    {job.type}
                                </section>

                                <p className="mt-2 text-sm text-gray-600">
                                    Lương: {job.salary}
                                </p>
                            </div>

                            <button
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="Save job"
                                title="Save job"
                            >
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 mr-3 overflow-hidden bg-white rounded-full shadow-sm ring-1 ring-gray-100">
                                <img
                                    src={job.logo}
                                    alt={job.company}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">
                                    {job.company}
                                </p>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {job.location}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }, [jobs, loading, err]);

    return (
        <section className="py-16">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Featured job
                    </h2>
                    <Link
                        href="/jobs"
                        className="flex items-center font-medium text-blue-600 hover:text-blue-700"
                    >
                        View All <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>

                {body}
            </div>
        </section>
    );
};

export default FeaturedJobsSection;
