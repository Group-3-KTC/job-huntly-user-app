"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Building } from "lucide-react";
import useCompanySearchStore from "../store/companySearchStore";

const PopularSearches = () => {
    const router = useRouter();
    const { industries, locations, fetchIndustries, fetchLocations } =
        useCompanySearchStore();

    useEffect(() => {
        fetchIndustries();
        fetchLocations();
    }, [fetchIndustries, fetchLocations]);

    // Lấy 8 ngành nghề phổ biến
    const popularIndustries = industries.slice(0, 8);

    // Lấy 6 địa điểm phổ biến
    const popularLocations = locations.slice(0, 6);

    // Xử lý tìm kiếm theo category
    const handleCategorySearch = (categoryId, categoryName) => {
        // Đảm bảo categoryId là số nguyên, nhưng giữ nguyên dạng chuỗi cho URL
        router.push(
            `/company/company-search/results?categoryId=${categoryId}&categoryName=${encodeURIComponent(
                categoryName
            )}`
        );
    };

    // Xử lý tìm kiếm theo location
    const handleLocationSearch = (location) => {
        router.push(
            `/company/company-search/results?location=${encodeURIComponent(
                location
            )}`
        );
    };

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tìm kiếm phổ biến
            </h2>

            <div className="space-y-6">
                {/* Ngành nghề phổ biến */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <Building className="mr-2 h-5 w-5 text-[#0A66C2]" />
                        Ngành nghề
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {popularIndustries.map((industry) => (
                            <button
                                key={industry.cate_id}
                                onClick={() =>
                                    handleCategorySearch(
                                        industry.cate_id,
                                        industry.cate_name
                                    )
                                }
                                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#0A66C2] rounded-full text-sm transition-colors flex items-center"
                            >
                                <Building className="mr-1 h-4 w-4" />
                                {industry.cate_name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Địa điểm phổ biến */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-[#0A66C2]" />
                        Địa điểm
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {popularLocations.map((location, index) => (
                            <button
                                key={index}
                                onClick={() => handleLocationSearch(location)}
                                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full text-sm transition-colors flex items-center"
                            >
                                <MapPin className="mr-1 h-4 w-4" />
                                {location}
                            </button>
                        ))}
                        {popularLocations.length === 0 && (
                            <div className="px-4 py-2 text-gray-500 text-sm">
                                Đang tải danh sách địa điểm...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularSearches;
