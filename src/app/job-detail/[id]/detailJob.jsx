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
    FileText,
    ListChecks,
    Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedJobs from "./relatedJobs";
import ApplicationModal from "./applicationJob";
import { useRouter } from "next/navigation";
import ReportModal from "./report";

export default function DetailJob({ job }) {
    const [liked, setLiked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [openReportModal, setOpenReportModal] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const router = useRouter();

    const formatList = (field) =>
        Array.isArray(field) ? field.join(", ") : field || "Không xác định";

    const handleFlagClick = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return setShowLoginPrompt(true);

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.exp * 1000 < Date.now()) {
                localStorage.clear();
                return setShowLoginPrompt(true);
            }
            setOpenReportModal(true);
        } catch (err) {
            console.error("Invalid token", err);
            setShowLoginPrompt(true);
        }
    };

    const handleApply = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return setShowLoginPrompt(true);

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const isExpired = payload.exp * 1000 < Date.now();

            if (isExpired) {
                localStorage.clear();
                return setShowLoginPrompt(true);
            }
            setShowModal(true);
        } catch (err) {
            console.error("Invalid token", err);
            setShowLoginPrompt(true);
        }
    };

    return (
        <div className="w-full bg-gray-100 py-10 px-0">
            {showLoginPrompt && (
                <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Bạn cần đăng nhập
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Vui lòng đăng nhập để tiếp tục ứng tuyển.
                        </p>
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowLoginPrompt(false)}
                            >
                                Đóng
                            </Button>
                            <Button onClick={() => router.push("/login")}>
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full flex flex-col-reverse md:flex-row gap-6 px-4 md:px-10">
                {/* LEFT SIDE */}
                <div className="w-full md:w-[78%] flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {job.title}
                        </h1>

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
                                <Button
                                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={handleApply}
                                >
                                    Apply
                                </Button>

                                {showModal && (
                                    <ApplicationModal
                                        onClose={() => setShowModal(false)}
                                        jobTitle={job.title}
                                    />
                                )}
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
                                <Flag
                                    className="text-gray-600 cursor-pointer hover:scale-110 transition"
                                    onClick={handleFlagClick}
                                />
                            </div>

                            <ReportModal
                                open={openReportModal}
                                onClose={() => setOpenReportModal(false)}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-2">
                        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                            <FileText className="w-5 h-5 text-blue-500" />
                            Job Description
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">
                            {job.description || "Chưa có mô tả"}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-2">
                        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                            <ListChecks className="w-5 h-5 text-blue-500" />
                            Requirements
                        </div>
                        <div className="text-gray-700 whitespace-pre-line space-y-1">
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

                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-2">
                        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                            <Gift className="w-5 h-5 text-blue-500" />
                            Benefits
                        </div>
                        <div className="text-gray-700 whitespace-pre-line space-y-1">
                            {Array.isArray(job.benefits) &&
                            job.benefits.length > 0 ? (
                                job.benefits.map((item, index) => (
                                    <p key={index}>- {item}</p>
                                ))
                            ) : (
                                <p>Không có phúc lợi cụ thể</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-2">
                        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            Work Location
                        </div>
                        <div className="text-gray-700 whitespace-pre-line space-y-1">
                            {Array.isArray(job.location) &&
                            job.location.length > 0 ? (
                                job.location.map((item, index) => (
                                    <p key={index}>- {item}</p>
                                ))
                            ) : (
                                <p>Không rõ địa điểm</p>
                            )}
                        </div>
                    </div>
                    <RelatedJobs category={job.category} />
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full md:w-[22%] flex flex-col gap-4">
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
                            General
                        </h2>
                        <div className="space-y-3 text-gray-700">
                            <p>
                                <DollarSign
                                    className="inline mr-2 text-green-600"
                                    size={18}
                                />
                                <strong>Min Salary:</strong>{" "}
                                {job.salaryMin || "N/A"}
                            </p>
                            <p>
                                <DollarSign
                                    className="inline mr-2 text-green-600"
                                    size={18}
                                />
                                <strong>Max Salary:</strong>{" "}
                                {job.salaryMax || "N/A"}
                            </p>
                            <p>
                                <Calendar
                                    className="inline mr-2 text-blue-500"
                                    size={18}
                                />
                                <strong>Post Date:</strong>{" "}
                                {job.datePost
                                    ? new Date(job.datePost).toLocaleDateString(
                                          "vi-VN"
                                      )
                                    : "N/A"}
                            </p>
                            <p>
                                <Calendar
                                    className="inline mr-2 text-red-500"
                                    size={18}
                                />
                                <strong>Expired Date:</strong>{" "}
                                {job.expiredDate
                                    ? new Date(
                                          job.expiredDate
                                      ).toLocaleDateString("vi-VN")
                                    : "N/A"}
                            </p>
                        </div>
                    </div>

                    {Array.isArray(job.skill) && job.skill.length > 0 && (
                        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Skills Requirements
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
