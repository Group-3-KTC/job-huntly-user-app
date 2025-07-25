"use client";

import React from "react";
import Image from "next/image";
import useCompanyDetailStore from "../store/companyDetailStore";

const CompanyBanner = () => {
    const { company, toggleFollowCompany } = useCompanyDetailStore();

    if (!company) return null;

    return (
        <div
            className="relative h-64 mx-auto overflow-hidden bg-center bg-cover rounded-lg shadow max-w-7xl"
            style={{
                backgroundImage: `url(${
                    company.cover_photo ||
                    "https://static.topcv.vn/company_covers/tap-doan-cong-nghiep-vien-thong-quan-doi-e3c6e7727df189e29507b150c6a7d893-64c328ef424bd.jpg"
                })`,
            }}
        >
            <div className="absolute bottom-0 left-0 flex items-center justify-between w-full px-4 py-4 border rounded-b-lg bg-white/20 backdrop-blur-sm border-white/30">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 p-1 bg-white border border-gray-300 rounded">
                        <Image
                            src={company.logo || "/logo_example.png"}
                            alt={company.name}
                            width={64}
                            height={64}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            {company.name}
                        </h1>
                        <div className="mt-2 text-sm text-gray-600">
                            <span className="px-2 py-0.5 mr-2 text-yellow-800 bg-yellow-100 rounded">
                                Pro Company
                            </span>
                            <a
                                href={company.website}
                                className="hover:text-blue-600 underline"
                            >
                                {company.website?.replace("https://", "")}
                            </a>
                            · {company.quantity_employee}+ nhân viên ·{" "}
                            {Math.floor(Math.random() * 500)} người theo dõi
                        </div>
                    </div>
                </div>
                {/* Nút theo dõi */}
                <button
                    onClick={toggleFollowCompany}
                    className={`px-4 py-2 text-lg font-semibold text-white transition rounded ${
                        company.isFollowing ? "bg-gray-600" : "bg-[#0A66C2]"
                    }`}
                >
                    {company.isFollowing
                        ? "✓ Đang theo dõi"
                        : "+ Theo dõi công ty"}
                </button>
            </div>
        </div>
    );
};

export default CompanyBanner;
