"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useJobSearchStore } from "@/store/jobSearchStore";
import { useSearchJobsMutation } from "@/services/jobService";
import JobCardItem from "./JobCardItem";
import { toast } from "react-toastify";
import { showLoginPrompt } from "@/features/auth/loginPromptSlice";
import { useDispatch } from "react-redux";
import Pagination from "@/components/ui/pagination";

export default function CardJob() {
    const [list, setList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const router = useRouter();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8); 

    const { searchTerm, filters } = useJobSearchStore();
    const [searchJobs, { isLoading, error }] = useSearchJobsMutation();
    const debounceRef = useRef(null);

    // Build payload
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
            page: currentPage - 1, // 0-based
            size: pageSize, // Dynamic size (7-8)
            sort: "id,desc", // Default sort
        };
    }, [searchTerm, filters, currentPage, pageSize]);

    // Reset currentPage to 1 when searchTerm, filters, or pageSize change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters, pageSize]);

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
                setTotalPages(res.totalPages || 1);
                setTotalElements(res.totalElements || 0);
            } catch (e) {
                console.error(e);
            }
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [payload, searchJobs]);

    const handleToast = (msg, type) => {
        if (type === "success") toast.success(msg);
        if (type === "neutral") toast.info(msg);
        if (type === "error") toast.error(msg);
    };

    return (
        <div className="w-full max-w-[1000px] bg-white p-6 rounded-xl shadow-md space-y-6 mx-auto">
            {/* Phần list: Loading chỉ ở đây, không ảnh hưởng UI khác */}
            {error ? (
                <p className="text-center text-red-500">
                    Lỗi khi tải công việc:{" "}
                    {error?.data?.message ||
                        "Không thể tải danh sách công việc"}
                </p>
            ) : isLoading ? (
                <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            ) : totalElements === 0 ? (
                <p className="text-center text-gray-500">
                    Không có công việc phù hợp.
                </p>
            ) : (
                list.map((job) => (
                    <JobCardItem
                        key={job.id}
                        job={job}
                        onNeedLogin={() => dispatch(showLoginPrompt())}
                        onToast={handleToast}
                    />
                ))
            )}

            {/* Pagination luôn visible nếu totalPages > 1 (ngay cả khi loading) */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
}