"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function RelatedJobs({ category }) {
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(
        "https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/jobs"
      );
      const data = await res.json();

      const normalized = data.map((job) => ({
        ...job,
        category: Array.isArray(job.category)
          ? job.category
          : job.category?.split(",").map((s) => s.trim()) || [],
      }));

      const filtered = normalized.filter((job) =>
        job.category.some((cat) => category.includes(cat))
      );

      setRelatedJobs(filtered); 
    };

    if (category?.length) fetchJobs();
  }, [category]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Similar Job
      </h2>

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
        {/* Avatar + Info */}
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border">
            <img
              src={job.avatar}
              alt={job.companyName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.companyName}</p>
          </div>
        </div>

        {/* Heart */}
        <button onClick={() => setLiked(!liked)}>
          <Heart
            size={20}
            className={`transition-colors duration-200 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Skills */}
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

      {/* Xem chi tiết */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">{job.salary}</span>
        <Link
          href={`/job-detail/${job.id}`}
          className="text-sm text-primary font-medium hover:underline"
        >
          Xem chi tiết →
        </Link>
      </div>
    </div>
  );
}
