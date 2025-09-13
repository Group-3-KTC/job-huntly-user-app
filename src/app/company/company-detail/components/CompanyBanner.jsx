"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import useCompanyDetailStore from "../store/companyDetailStore";
import { getImageUrl } from "@/lib/utils";

import { selectIsLoggedIn } from "@/features/auth/authSelectors";
import { showLoginPrompt } from "@/features/auth/loginPromptSlice";
import ReportModal from "@/components/ui/report";
import { MessageSquareWarning } from "lucide-react";

const CompanyBanner = () => {
    const { company, toggleFollowCompany } = useCompanyDetailStore();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const [openReport, setOpenReport] = useState(false);

    if (!company) return null;

    const guardOr = useCallback(
            (action) => {
                if (!isLoggedIn) {
                dispatch(showLoginPrompt());
                setOpenReport(false);
                return;
            }
            action?.();
        },
        [isLoggedIn, dispatch]
    );

    const handleFollow = useCallback(
        () => guardOr(() => toggleFollowCompany()),
        [guardOr, toggleFollowCompany]
    );

    const handleReport = useCallback(
        () => guardOr(() => setOpenReport(true)),
        [guardOr]
    );

    return (
        <div
            className="relative h-64 mx-auto overflow-hidden bg-center bg-cover rounded-lg shadow max-w-7xl"
            style={{
                backgroundImage: `url(${
                    getImageUrl(company.avatarCover) ||
                    "https://static.topcv.vn/company_covers/tap-doan-cong-nghiep-vien-thong-quan-doi-e3c6e7727df189e29507b150c6a7d893-64c328ef424bd.jpg"
                })`,
            }}
        >
            <div className="absolute bottom-0 left-0 flex items-center justify-between w-full px-4 py-4 border rounded-b-lg bg-white/20 backdrop-blur-sm border-white/30">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 p-1 bg-white border border-gray-300 rounded">
                        <Image
                            src={getImageUrl(company.avatar)}
                            alt={company.companyName}
                            width={64}
                            height={64}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            {company.companyName}
                        </h1>
                        <div className="mt-2 text-sm text-white-600">
                            {company.isProCompany && (
                                <span className="px-2 py-0.5 mr-2 text-yellow-800 bg-yellow-100 rounded">
                                    Pro Company
                                </span>
                            )}
                            <a
                                href={company.website}
                                className="underline hover:text-blue-600"
                            >
                                {company.website?.replace("https://", "")}
                            </a>
                            · {company.quantityEmployee}+ nhân viên ·{" "}
                            {company.followersCount} người theo dõi
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleFollow}
                        className={`px-4 py-2 text-lg font-semibold text-white transition rounded ${
                            company.isFollowing ? "bg-gray-600" : "bg-[#0A66C2]"
                        }`}
                    >
                        {company.isFollowing
                            ? "✓ Đang theo dõi"
                            : "+ Theo dõi công ty"}
                    </button>

                    {/* Report icon button */}
                    <button
                        onClick={handleReport}
                        className="p-2 text-red-600 transition bg-white border rounded hover:bg-red-50"
                        title="Report Company"
                    >
                        <MessageSquareWarning className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <ReportModal
                open={openReport}
                onClose={() => setOpenReport(false)}
                type={2} // 2 = Company
                contentId={company.id}
            />
        </div>
    );
};

export default CompanyBanner;