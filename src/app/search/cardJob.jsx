"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useJobSearchStore } from "@/store/jobSearchStore";
import { useGetJobsQuery } from "@/services/jobService";

export default function CardJob() {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [liked, setLiked] = useState({});
  const router = useRouter();

  const { searchTerm, filters } = useJobSearchStore();

  const { data: jobs = [], isLoading, error } = useGetJobsQuery();

  useEffect(() => {
    if (!jobs.length) return;

    const normalized = jobs.map((job) => ({
      ...job,
      workType: Array.isArray(job.workType)
        ? job.workType
        : job.workType?.split(",").map((s) => s.trim()) || [],
      level: Array.isArray(job.level)
        ? job.level
        : job.level?.split(",").map((s) => s.trim()) || [],
      category: Array.isArray(job.category)
        ? job.category
        : job.category?.split(",").map((s) => s.trim()) || [],
      skill: Array.isArray(job.skill)
        ? job.skill
        : job.skill?.split(",").map((s) => s.trim()) || [],
    }));

    let filtered = [...normalized];

    if (searchTerm?.keyword) {
      const keyword = searchTerm.keyword.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.companyName.toLowerCase().includes(keyword)
      );
    }

    if (searchTerm?.province) {
      const provinceLower = searchTerm.province.toLowerCase();
      filtered = filtered.filter((job) => {
        if (Array.isArray(job.city)) {
          return job.city.some(
            (c) =>
              typeof c === "string" && c.toLowerCase().includes(provinceLower)
          );
        } else if (typeof job.city === "string") {
          return job.city.toLowerCase().includes(provinceLower);
        }
        return false;
      });
    }

    if (filters.workTypes.length) {
      filtered = filtered.filter((job) =>
        job.workType.some((type) => filters.workTypes.includes(type))
      );
    }

    if (filters.levels.length) {
      filtered = filtered.filter((job) =>
        job.level.some((lvl) => filters.levels.includes(lvl))
      );
    }

    if (filters.categories.length) {
      filtered = filtered.filter((job) =>
        job.category.some((cat) => filters.categories.includes(cat))
      );
    }

    if (filters.skills.length) {
      filtered = filtered.filter((job) =>
        job.skill.some((sk) => filters.skills.includes(sk))
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, filters]);

  const toggleLike = (jobId) => {
    setLiked((prev) => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Lỗi khi tải công việc: {error.message}
      </p>
    );

  return (
    <div className="w-full max-w-[1000px] bg-white p-6 rounded-xl shadow-md space-y-6 mx-auto">
      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-500">Không có công việc phù hợp.</p>
      ) : (
        filteredJobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-5 shadow space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-start gap-4 w-full md:w-auto">
                <img
                  src={job.avatar}
                  alt="Logo"
                  className="w-20 h-20 rounded object-cover object-center"
                />
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-[#0a66c2]" onClick={() => router.push(`/job-detail/${job.id}`)}>
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
                  onClick={() => router.push(`/job-detail/${job.id}`)}
                >
                  Xem chi tiết
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
    </div>
  );
}
