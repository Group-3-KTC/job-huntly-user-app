"use client";

import React, { useState } from "react";
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

  const formatList = (field) =>
    Array.isArray(field) ? field.join(", ") : field || "Không xác định";

  return (
    <div className="w-full bg-gray-100 py-10 px-0">
      <div className="w-full flex gap-6">
        {/* LEFT SIDE */}
        <div className="w-[78%] flex flex-col gap-6 mr-4 ml-10">
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <MapPin size={16} />
                {formatList(job.city)}
              </span>
              <span className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                <Layers size={16} />
                {formatList(job.category)}
              </span>
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                <Briefcase size={16} />
                {formatList(job.level)}
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
              Thông tin công việc
            </h2>
            <div className="text-gray-700 space-y-3">
              <div>
                <strong>Mô tả:</strong>
                <p className="whitespace-pre-line">
                  {job.description || "Chưa có mô tả"}
                </p>
              </div>
              <div>
                <strong>Yêu cầu:</strong>
                <div className="whitespace-pre-line">
                  {Array.isArray(job.requirments) &&
                  job.requirments.length > 0 ? (
                    job.requirments.map((item, index) => (
                      <p key={index}>- {item}</p>
                    ))
                  ) : (
                    <p>Không có yêu cầu cụ thể</p>
                  )}
                </div>
              </div>
              <div>
                <strong>Phúc lợi:</strong>
                <div className="whitespace-pre-line">
                  {Array.isArray(job.benefits) && job.benefits.length > 0 ? (
                    job.benefits.map((item, index) => (
                      <p key={index}>- {item}</p>
                    ))
                  ) : (
                    <p>Không có phúc lợi cụ thể</p>
                  )}
                </div>
              </div>
              <div>
                <strong>Địa điểm làm việc:</strong>
                <div className="whitespace-pre-line">
                  {Array.isArray(job.location) && job.location.length > 0 ? (
                    job.location.map((item, index) => (
                      <p key={index}>- {item}</p>
                    ))
                  ) : (
                    <p>Không rõ địa điểm</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <RelatedJobs category={job.category} />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[22%] flex flex-col gap-4 mr-4">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-3">
            <img
              src={job.avatar}
              alt="Company Logo"
              className="w-20 h-20 rounded-full object-contain border"
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
                <strong>Lương tối thiểu:</strong> {job.salaryMin || "N/A"}
              </p>
              <p>
                <DollarSign className="inline mr-2 text-green-600" size={18} />
                <strong>Lương tối đa:</strong> {job.salaryMax || "N/A"}
              </p>
              <p>
                <Calendar className="inline mr-2 text-blue-500" size={18} />
                <strong>Ngày đăng:</strong>{" "}
                {job.datePost
                  ? new Date(job.datePost).toLocaleDateString("vi-VN")
                  : "N/A"}
              </p>
              <p>
                <Calendar className="inline mr-2 text-red-500" size={18} />
                <strong>Hạn ứng tuyển:</strong>{" "}
                {job.expiredDate
                  ? new Date(job.expiredDate).toLocaleDateString("vi-VN")
                  : "N/A"}
              </p>
            </div>
          </div>
          {Array.isArray(job.skill) && job.skill.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Kỹ năng yêu cầu
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skill.map((skill, index) => (
                  <span
                    key={index}
                    className="border border-blue-500 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
