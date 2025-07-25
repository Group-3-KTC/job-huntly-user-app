"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useCompanyDetailStore from "../store/companyDetailStore";

const RelatedCompanies = () => {
    const { relatedCompanies } = useCompanyDetailStore();

    if (relatedCompanies.length === 0) return null;

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl">
            <div className="p-6 mt-4 text-white rounded-t-lg bg-gradient-to-r from-[#0A66C2] to-[#1F2937]">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Thương hiệu lớn tiêu biểu cùng lĩnh vực
                    </h2>
                    <span className="px-2 py-1 text-xs font-bold text-[#FF8A00] bg-[#FFFAF0] rounded">
                        Pro Company
                    </span>
                </div>
                <p className="mt-1 text-sm text-white/80">
                    Những thương hiệu tuyển dụng đã khẳng định được vị thế trên
                    thị trường.
                </p>
            </div>

            <div className="grid grid-cols-2 grid-rows-5 gap-4">
                {relatedCompanies.slice(0, 10).map((company, index) => (
                    <Link
                        href={`/company/company-detail/${company.company_id}`}
                        key={company.company_id}
                        className={`flex items-center gap-3 p-3 border rounded hover:shadow border-[#FF8A00]/30 ${
                            index === 0 ? "mt-3" : ""
                        }`}
                    >
                        <div className="w-10 h-10">
                            <Image
                                src={company.logo || "/logo_example.png"}
                                alt={company.name}
                                width={40}
                                height={40}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <div className="w-full overflow-hidden text-sm">
                            <h3 className="text-sm font-semibold truncate text-[#1F2937]">
                                {company.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {company.industry}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedCompanies;
