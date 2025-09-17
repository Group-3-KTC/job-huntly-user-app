"use client";

import React, { useState } from "react";
import Image from "next/image";
import useCompanyDetailStore from "../store/companyDetailStore";
import Link from "next/link";
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getImageUrl } from "@/lib/utils";

const CompanyJobs = () => {
    const { company, jobs } = useCompanyDetailStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");

    if (!company) return null;
    
    const calculateRemainingDays = (expiredDate) => {
        try {
            // Format là DD-MM-YYYY
            const date = parse(expiredDate, 'dd-MM-yyyy', new Date());
            const now = new Date();
            
            // Tính số ngày còn lại
            const diffTime = date.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return diffDays > 0 ? diffDays : 0;
        } catch (error) {
            console.error("Lỗi khi tính ngày hết hạn:", error);
            return 0;
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl">
            <h2 className="px-4 py-2 text-lg font-semibold text-white bg-blue-700 rounded">
                Tuyển dụng
            </h2>
            <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                <input
                    type="text"
                    placeholder="Tên công ty, vị trí ứng tuyển..."
                    className="w-full h-10 px-4 border border-gray-300 rounded focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="w-full h-10 px-4 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2]"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value="">Tất cả tỉnh/thành phố</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP.HCM">TP.HCM</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
                <button className="w-full h-10 text-white bg-blue-700 rounded hover:bg-blue-800">
                    Tìm kiếm
                </button>
            </div>

            <div className="mt-8 space-y-4">
                {jobs.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 border border-gray-200 rounded-lg">
                        Hiện chưa có tin tuyển dụng nào từ công ty này
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job.id}
                            className="flex flex-col items-start gap-4 p-4 border rounded-lg border-[#D0E5F9] md:flex-row md:items-center"
                        >
                            <Image
                                src={getImageUrl(
                                    job.company?.avatar || company.avatar
                                )}
                                alt={company.companyName}
                                width={64}
                                height={64}
                                className="object-contain w-16 h-16"
                            />
                            <div className="flex-1 space-y-1">
                                <h3 className="text-base font-semibold truncate text-[#1F2937]">
                                    <Link
                                        href={`/job-detail/${job.id}`}
                                        className="hover:text-[#0A66C2]"
                                    >
                                        {job.title}
                                    </Link>
                                    {company.isProCompany && (
                                        <span className="ml-1 text-[#1F2937]">
                                            ✔
                                        </span>
                                    )}
                                </h3>
                                <p className="text-sm font-semibold text-[#FF8A00]">
                                    {company.companyName.toUpperCase()}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-[#1F2937]">
                                    <span className="px-2 py-1 rounded bg-[#F5F7FA]">
                                        {job.location}
                                    </span>
                                    <span className="px-2 py-1 rounded bg-[#F5F7FA]">
                                        Còn{" "}
                                        {calculateRemainingDays(
                                            job.expired_date
                                        )}{" "}
                                        ngày để ứng tuyển
                                    </span>
                                </div>
                            </div>
                            <div className="w-full space-y-2 text-right md:w-auto">
                                <div className="text-sm font-medium text-[#0A66C2]">
                                    {job.salaryDisplay}
                                </div>
                                <Link
                                    href={`/job-detail/${job.id}/applicationJob`}
                                >
                                    <button className="px-4 py-1 text-sm text-white bg-blue-700 rounded hover:bg-blue-800">
                                        Ứng tuyển
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CompanyJobs;
