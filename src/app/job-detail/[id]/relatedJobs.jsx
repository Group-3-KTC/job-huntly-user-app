"use client";
import { useState, useMemo } from "react";
import { useGetJobsQuery } from "@/services/jobService";
import { Heart } from "lucide-react";
import Link from "next/link";
import LoadingScreen from "@/components/ui/loadingScreen";
import Image from "next/image";

export default function RelatedJobs({ category = [] }) {
    const { data, isLoading, error } = useGetJobsQuery();
    const [visibleCount, setVisibleCount] = useState(5);
    const jobsSource = useMemo(() => {
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.jobs)) return data.jobs;
        if (Array.isArray(data?.content)) return data.content;
        return [];
    }, [data]);

    const normalizedJobs = useMemo(() => {
        return jobsSource.map((job) => ({
            id: job.id,
            title: job.title || "",
            avatar: job.company?.avatar || "",
            companyName: job.company?.company_name || "",
            skill: job.skill_names || [],
            category: job.category_names || [],
            salaryDisplay: job.salaryDisplay || "",
        }));
    }, [jobsSource]);

    const categorySet = useMemo(() => {
        if (!Array.isArray(category)) return new Set();
        return new Set(
            category.filter(Boolean).map((c) => c.trim().toLowerCase())
        );
    }, [category]);

    const relatedJobs = useMemo(() => {
        if (categorySet.size === 0) return [];
        return normalizedJobs.filter((job) =>
            (job.category || []).some(
                (cat) => cat && categorySet.has(cat.trim().toLowerCase())
            )
        );
    }, [normalizedJobs, categorySet]);

    const handleLoadMore = () => setVisibleCount((prev) => prev + 10);
    const handleCollapse = () => setVisibleCount(10);

    if (isLoading) return <LoadingScreen message="Loading ..." />;
    if (error)
        return (
            <p className="text-red-500">Không tải được danh sách liên quan.</p>
        );

    const hasMore = visibleCount < relatedJobs.length;

    return (
        <div className="mt-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Similar Job
            </h2>

            {relatedJobs.length === 0 ? (
                <p className="text-gray-500">Chưa có công việc tương tự.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {relatedJobs.slice(0, visibleCount).map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        {hasMore ? (
                            <button
                                onClick={handleLoadMore}
                                className="px-4 py-2 text-white transition bg-blue-700 rounded hover:bg-primary/80"
                            >
                                Xem thêm
                            </button>
                        ) : relatedJobs.length > 10 ? (
                            <button
                                onClick={handleCollapse}
                                className="px-4 py-2 text-gray-800 transition bg-blue-200 rounded hover:bg-gray-300"
                            >
                                Ẩn bớt
                            </button>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
}

function JobCard({ job }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="p-4 transition duration-200 bg-white border shadow rounded-2xl hover:shadow-md">
            <Link href={`/job-detail/${job.id}`}>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="relative w-16 h-16 overflow-hidden border rounded-full">
                            <Image
                                fill
                                src={job.avatar}
                                alt={job.companyName}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 hover:underline">
                                {job.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {job.companyName}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setLiked(!liked)} type="button">
                        <Heart
                            size={20}
                            className={`transition-colors duration-200 ${
                                liked
                                    ? "fill-red-500 text-red-500"
                                    : "text-gray-400"
                            }`}
                        />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                    {job.skill?.map((skill, i) => (
                        <span
                            key={i}
                            className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-600">
                        {job.salaryDisplay || ""}
                    </span>
                    <span className="text-sm font-medium text-primary hover:underline">
                        Xem chi tiết
                    </span>
                </div>
            </Link>
        </div>
    );
}
