"use client";

import {
    useGetSavedCompaniesQuery,
    useDeleteSavedCompanyMutation,
} from "@/services/savedCompaniesService";
import Link from "next/link";
import { Eye, Trash2, Building2, MapPin, Clock } from "lucide-react";

export default function ListCompanySaved() {
    const {
        data: savedCompanies = [],
        error,
        isLoading,
    } = useGetSavedCompaniesQuery();

    const [deleteSavedCompany] = useDeleteSavedCompanyMutation();

    const handleDeleteAction = async (savedCompanyId) => {
        if (window.confirm("Bạn có chắc muốn bỏ theo dõi công ty này không?")) {
            try {
                await deleteSavedCompany(savedCompanyId).unwrap();
            } catch (err) {
                console.error("Lỗi khi bỏ theo dõi công ty:", err);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="container max-w-6xl p-6 mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                    <div className="text-lg font-medium text-gray-600">
                        Loading companys list...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        const errorMessage =
            error?.data?.message || error?.error || "Đã xảy ra lỗi";
        return (
            <div className="container max-w-6xl p-6 mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <div className="p-4 bg-red-100 rounded-full">
                        <Building2 className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-center">
                        <h2 className="mb-2 text-xl font-semibold text-red-600">
                            Không thể tải dữ liệu
                        </h2>
                        <p className="text-gray-600">Lỗi: {errorMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {/* Header Section */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-200 mb-4 to-indigo-50 border-b border-gray-100 rounded-xl">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-800 pl-4">
                        Follow and companies you care about
                    </h1>
                </div>
            </div>

            {/* Companies List */}
            {savedCompanies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="p-6 mb-6 bg-gray-100 rounded-full">
                        <Building2 className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-600">
                        Chưa có công ty nào
                    </h3>
                    <p className="max-w-md text-center text-gray-500">
                        Bạn chưa theo dõi công ty nào. Hãy khám phá và lưu những
                        công ty mà bạn quan tâm.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {savedCompanies.map((company) => (
                        <div
                            key={company.id}
                            className="z-2 relative flex items-center px-4 py-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-2xl hover:shadow-lg hover:border-blue-200"
                        >
                            {/* Company Avatar */}
                            <div className="flex-shrink-0 mr-6">
                                <img
                                    src={company.avatar}
                                    alt={`${company.companyName} logo`}
                                    className="object-contain w-20 h-20 transition-shadow duration-300  rounded-xl group-hover:shadow-md"
                                />
                            </div>

                            {/* Company Info */}
                            <div className="flex-1 min-w-0 justify-start">
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 truncate">
                                    {company.companyName}
                                </h3>

                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-gray-400" />
                                        <span className="line-clamp-2 text-lg">
                                            {company.address}
                                        </span>
                                    </div>

                                    <div className="flex items-center text-gray-500">
                                        <Clock className="w-3 h-4 mr-2 text-sm text-gray-400" />
                                        <span className="">
                                            Theo dõi từ:{" "}
                                            {new Date(
                                                company.saveTime
                                            ).toLocaleString("vi-VN", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center flex-shrink-0 ml-6 space-x-3">
                                <Link
                                    href={`/company/company-detail/${company.companyId}`}
                                    className="flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                                    aria-label={`Xem chi tiết công ty ${company.companyName}`}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Xem chi tiết
                                </Link>

                                <button
                                    onClick={() =>
                                        handleDeleteAction(company.id)
                                    }
                                    className="p-2.5 cursor-pointer text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group/delete"
                                    aria-label={`Bỏ theo dõi công ty ${company.companyName}`}
                                >
                                    <Trash2 className="w-4 h-4 transition-transform duration-200 group-hover/delete:scale-110" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
