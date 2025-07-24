"use client";
import { useState, useMemo } from "react";
import { useGetJobsQuery } from "@/services/jobService";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function RelatedJobs({ category }) {
  const { data: jobs = [], isLoading } = useGetJobsQuery();
  
  const relatedJobs = useMemo(() => {
    return jobs
      .map((job) => ({
        ...job,
        categories: Array.isArray(job.category)
          ? job.category
          : job.category?.split(",").map((s) => s.trim()) || [],
      }))
      .filter((job) =>
        job.categories?.some((cat) => category.includes(cat))
      );
  }, [jobs, category]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Similar Job</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="border rounded-2xl p-4 bg-white shadow hover:shadow-md transition duration-200">
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border">
            <img src={job.avatar} alt={job.companyName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.companyName}</p>
          </div>
        </div>
        <button onClick={() => setLiked(!liked)}>
          <Heart
            size={20}
            className={`transition-colors duration-200 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.skill?.map((skill, i) => (
          <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">{job.salary}</span>
        <Link href={`/job-detail/${job.id}`} className="text-sm text-primary font-medium hover:underline">
          Xem chi tiết →
        </Link>
      </div>
    </div>
  );
}