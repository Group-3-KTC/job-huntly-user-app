"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, HeartIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useJobSearchStore } from "@/store/jobSearchStore";
import { useSearchJobsMutation } from "@/services/jobService";

export default function CardJob() {
    const [list, setList] = useState([]);
    const [liked, setLiked] = useState({});
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    const { searchTerm, filters } = useJobSearchStore();

    const [searchJobs, { isLoading, error }] = useSearchJobsMutation();
    const debounceRef = useRef(null);
    const payload = useMemo(() => {
        const {
            keyword = "",
            province = "",
            companyName = "",
        } = searchTerm || {};

        return {
            keyword: keyword || undefined,
            companyName: companyName || undefined,

            cityName: province || undefined,

            categoryNames: filters?.categories?.length
                ? filters.categories
                : undefined,
            skillNames: filters?.skills?.length ? filters.skills : undefined,
            levelNames: filters?.levels?.length ? filters.levels : undefined,
            workTypeNames: filters?.workTypes?.length
                ? filters.workTypes
                : undefined,
            wardNames: undefined,
            matchAllCategories: false,
            matchAllSkills: false,
            matchAllLevels: false,
            matchAllWorkTypes: false,
            matchAllWards: false,

            salaryMin: undefined,
            salaryMax: undefined,

            postedFrom: undefined, 
            postedTo: undefined,
        };
    }, [searchTerm, filters]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await searchJobs(payload).unwrap();
                const jobs = res?.jobs || [];
                const normalized = jobs.map((job) => ({
                    ...job,
                    id: job.id,
                    title: job.title || "",
                    avatar: job.company?.avatar || "",
                    companyName: job.company?.company_name || "",
                    workType: job.work_type_names || [],
                    level: job.level_names || [],
                    category: job.category_names || [],
                    skill: job.skill_names || [],
                    city: job.wards || [],
                    salaryDisplay: job.salaryDisplay,
                }));

                setList(normalized);
                setCurrentPage(1);
            } catch (e) {
            }
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [payload, searchJobs]);

    const toggleLike = (jobId) => {
        setLiked((prev) => ({ ...prev, [jobId]: !prev[jobId] }));
    };
    const totalPages = Math.ceil(list.length / jobsPerPage) || 1;
    const startIndex = (currentPage - 1) * jobsPerPage;
    const paginatedJobs = list.slice(startIndex, startIndex + jobsPerPage);

    if (isLoading)
        return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
    if (error)
        return (
            <p className="text-center text-red-500">
                Lỗi khi tải công việc:{" "}
                {error?.data?.message || "Không thể tải danh sách công việc"}
            </p>
        );

    return (
        <div className="w-full max-w-[1000px] bg-white p-6 rounded-xl shadow-md space-y-6 mx-auto">
            {list.length === 0 ? (
                <p className="text-center text-gray-500">
                    Không có công việc phù hợp.
                </p>
            ) : (
                paginatedJobs.map((job) => (
                    <div
                        key={job.id}
                        className="border rounded-lg p-5 shadow space-y-3"
                    >
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-start gap-4 w-full md:w-auto">
                                <img
                                    src={job.avatar}
                                    alt="Logo"
                                    className="w-20 h-20 rounded object-contain object-center"
                                />
                                <div className="space-y-1">
                                    <h3
                                        className="font-semibold text-lg text-[#0a66c2] hover:underline cursor-pointer"
                                        onClick={() =>
                                            router.push(`/job-detail/${job.id}`)
                                        }
                                    >
                                        {job.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 font-medium">
                                        {job.companyName}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {job.skill.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-white border border-[#0a66c2] text-[#0a66c2] text-xs px-2 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    className="bg-[#0a66c2] text-white px-4 py-1 rounded-full"
                                    onClick={() =>
                                        router.push(`/job-detail/${job.id}`)
                                    }
                                >
                                    Job Detail
                                </Button>
                                <button
                                    onClick={() => toggleLike(job.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    {liked[job.id] ? (
                                        <HeartIcon
                                            size={16}
                                            className="text-red-500 fill-red-500"
                                        />
                                    ) : (
                                        <Heart size={16} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="w-9 h-9"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                        <Button
                            key={page}
                            variant={
                                page === currentPage ? "default" : "outline"
                            }
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 text-sm ${
                                page === currentPage
                                    ? "bg-[#0a66c2] text-white"
                                    : ""
                            }`}
                        >
                            {page}
                        </Button>
                    )
                )}

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="w-9 h-9"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
