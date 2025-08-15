"use client";

import React, { useState } from "react";
import useCompanyDetailStore from "../store/companyDetailStore";

const CompanyDescription = () => {
    const { company } = useCompanyDetailStore();
    const [expanded, setExpanded] = useState(false);

    if (!company) return null;

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl">
            <h2 className="px-4 py-2 text-lg font-semibold text-white rounded bg-[#0A66C2]">
                Giới thiệu công ty
            </h2>
            
            <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-700">Năm thành lập</h3>
                        <p className="mt-1 text-blue-600">{company.foundedYear}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-700">Quy mô nhân sự</h3>
                        <p className="mt-1 text-blue-600">{company.quantityEmployee}+ nhân viên</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-700">Việc làm đang đăng</h3>
                        <p className="mt-1 text-blue-600">{company.jobsCount || 0} việc làm</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-700">Lĩnh vực hoạt động</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {company.categories?.map((category, index) => (
                                <span key={index} className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                    <h3 className="mb-3 font-semibold">Mô tả chi tiết</h3>
                    <div
                        className={`leading-relaxed text-justify ${
                            expanded ? "" : "line-clamp-6"
                        }`}
                    >
                        {company.description}
                    </div>
                    
                    {company.description && company.description.length > 300 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="mt-4 text-sm font-medium hover:underline text-[#0A66C2]"
                        >
                            {expanded ? "Thu gọn" : "Xem thêm"}{" "}
                            <span className="ml-1">{expanded ? "▲" : "▼"}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyDescription;
