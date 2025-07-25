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
            <div
                className={`mt-4 leading-relaxed text-justify ${
                    expanded ? "" : "line-clamp-6"
                }`}
            >
                {company.description}
            </div>
            <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 text-sm font-medium hover:underline text-[#0A66C2]"
            >
                {expanded ? "Thu gọn" : "Xem thêm"}{" "}
                <span className="ml-1">{expanded ? "▲" : "▼"}</span>
            </button>
        </div>
    );
};

export default CompanyDescription;
