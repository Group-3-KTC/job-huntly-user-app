"use client";
import { useState, useMemo } from "react";
import { useGetJobsQuery } from "@/services/jobService";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function RelatedJobs({ category = [] }) {
    const { data, isLoading, error } = useGetJobsQuery();
    const [visibleCount, setVisibleCount] = useState(10);
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

    if (isLoading) return <p>Loading...</p>;
    if (error)
        return (
            <p className="text-red-500">Không tải được danh sách liên quan.</p>
        );

    const hasMore = visibleCount < relatedJobs.length;

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Similar Job
            </h2>

            {relatedJobs.length === 0 ? (
                <p className="text-gray-500">Chưa có công việc tương tự.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedJobs.slice(0, visibleCount).map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center gap-4">
                        {hasMore ? (
                            <button
                                onClick={handleLoadMore}
                                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-primary/80 transition"
                            >
                                Xem thêm
                            </button>
                        ) : relatedJobs.length > 10 ? (
                            <button
                                onClick={handleCollapse}
                                className="px-4 py-2 bg-blue-200 text-gray-800 rounded hover:bg-gray-300 transition"
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
        <div className="border rounded-2xl p-4 bg-white shadow hover:shadow-md transition duration-200">
            <Link href={`/job-detail/${job.id}`}>
                <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border">
                            <img
                                src={job.avatar}
                                alt={job.companyName}
                                className="w-full h-full object-cover"
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

                <div className="mt-3 flex flex-wrap gap-2">
                    {job.skill?.map((skill, i) => (
                        <span
                            key={i}
                            className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                        {job.salaryDisplay || ""}
                    </span>
                    <span className="text-sm text-primary font-medium hover:underline">
                        Xem chi tiết
                    </span>
                </div>
            </Link>
        </div>
    );
}
