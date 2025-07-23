"use client";

import React from "react";
import { useState } from "react";
import {
  MapPin,
  Briefcase,
  Layers,
  Heart,
  Flag,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedJobs from "./relatedJobs";

export default function DetailJob({ job }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full bg-gray-100 py-10 px-0">
      <div className="w-full flex gap-6">
        {/* LEFT SIDE: 3/4 width */}
        <div className="w-[78%] flex flex-col gap-6 mr-4 ml-10">

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <MapPin size={16} />
                {Array.isArray(job.city) ? job.city.join(", ") : job.city}
              </span>
              <span className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                <Layers size={16} />
                {Array.isArray(job.category)
                  ? job.category.join(", ")
                  : job.category}
              </span>
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                <Briefcase size={16} />
                {job.level?.join(", ")}
              </span>
            </div>

            <div className="grid grid-cols-10 items-center gap-2 mt-4">
              <div className="col-span-8">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Ứng tuyển
                </Button>
              </div>
              <div className="col-span-1 flex justify-center">
                <Heart
                  onClick={() => setLiked(!liked)}
                  className={`cursor-pointer hover:scale-110 transition ${
                    liked
                      ? "text-red-600 fill-red-600"
                      : "text-gray-400 fill-none"
                  }`}
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <Flag className="text-gray-600 cursor-pointer hover:scale-110 transition" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              About the job
            </h2>
            <div className="text-gray-700 space-y-3">
              <div>
                <strong>Description:</strong>
                <p className="whitespace-pre-line">{job.description}</p>
              </div>
              <div>
                <strong>Requirments:</strong>
                <div className="whitespace-pre-line">
                  {job.requirments?.map((item, index) => (
                    <p key={index}>- {item}</p>
                  ))}
                </div>
              </div>

              <div>
                <strong>Benefits:</strong>
                <div className="whitespace-pre-line">
                  {job.benefits?.map((item, index) => (
                    <p key={index}>- {item}</p>
                  ))}
                </div>
              </div>

              <div>
                <strong>Work Location:</strong>
                <div className="whitespace-pre-line">
                  {job.location?.map((item, index) => (
                    <p key={index}>- {item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <RelatedJobs category={job.category} />
        </div>

        {/* RIGHT SIDE: 1/4 width */}
        <div className="w-[22%] flex flex-col gap-4 mr-4">

          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-3">
            <img
              src={job.avatar}
              alt="Company Logo"
              className="w-20 h-20 rounded-full object-contain rounded-full border"
            />
            <p className="text-xl font-semibold text-gray-700">
              {job.companyName}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Thông tin chung
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <DollarSign className="inline mr-2 text-green-600" size={18} />
                <strong>Mức lương tối thiểu:</strong> {job.salaryMin}
              </p>
              <p>
                <DollarSign className="inline mr-2 text-green-600" size={18} />
                <strong>Mức lương tối đa:</strong> {job.salaryMax}
              </p>
              <p>
                <Calendar className="inline mr-2 text-blue-500" size={18} />
                <strong>Ngày đăng:</strong>{" "}
                {new Date(job.datePost).toLocaleDateString("vi-VN")}
              </p>
              <p>
                <Calendar className="inline mr-2 text-red-500" size={18} />
                <strong>Hạn ứng tuyển:</strong>{" "}
                {new Date(job.expiredDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
