"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Building, MapPin, Search, Filter, CheckCircle } from "lucide-react";
import { BASE_API_URL } from "@/constants/apiCompanyConstants";

import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import ResultItem from "../components/ResultItem";
import useCompanySearchStore from "../store/companySearchStore";

const companySizes = [
    { id: "1-10", label: "1-10 nhân viên" },
    { id: "11-50", label: "11-50 nhân viên" },
    { id: "51-200", label: "51-200 nhân viên" },
    { id: "201-500", label: "201-500 nhân viên" },
    { id: "501+", label: "501+ nhân viên" },
];

const ITEMS_PER_PAGE = 8;

const ResultPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilterOnMobile, setShowFilterOnMobile] = useState(false);
    const [useDirectAPIResults, setUseDirectAPIResults] = useState(false);
    const [apiResults, setApiResults] = useState([]);

    // Lấy state và actions từ Zustand store
    const {
        companies,
        industries,
        filters,
        searchTerm,
        isLoading,
        error,
        fetchCompanies,
        searchCompanies,
        fetchCompaniesByCategories,
        fetchCompaniesByLocation,
        fetchIndustries,
        fetchLocations,
        setFilters,
        setSearchTerm,
        getFilteredCompanies,
        getFilterCounts,
    } = useCompanySearchStore();

    useEffect(() => {
        const name =
            searchParams.get("name") || searchParams.get("company") || "";
        const location = searchParams.get("location") || "";
        const categoryIdsParam = searchParams.get("categoryIds") || "";
        const categoryIds = categoryIdsParam
            ? categoryIdsParam.split(",").map(Number)
            : [];

        setSearchTerm({ company: name, location });

        if (categoryIds.length > 0) {
            setFilters((prev) => ({ ...prev, categoryIds }));
        }

        const performSearch = async () => {
            if (name && categoryIds.length > 0) {
                // Tìm kiếm kết hợp
                await searchCompanies({
                    name,
                    categoryIds,
                });
            } else if (categoryIds.length > 0) {
                await fetchCompaniesByCategories(categoryIds.join(","));
            } else if (name) {
                await searchCompanies({ name });
            } else if (location) {
                await fetchCompaniesByLocation(location);
            } else {
                await fetchCompanies();
            }
        };

        performSearch();
    }, [searchParams]);

    // Lọc kết quả dựa trên bộ lọc hoặc sử dụng kết quả API trực tiếp
    const filteredResults =
        useDirectAPIResults && apiResults && apiResults.length > 0
            ? apiResults
            : getFilteredCompanies();
    const filterCounts = getFilterCounts();

    // Xử lý tìm kiếm
    const handleSearch = (searchParams) => {
        setSearchTerm(searchParams);

        const queryParams = new URLSearchParams();
        if (searchParams.company)
            queryParams.append("company", searchParams.company);
        if (searchParams.location)
            queryParams.append("location", searchParams.location);
        if (searchParams.categoryIds?.length)
            queryParams.append(
                "categoryIds",
                searchParams.categoryIds.join(",")
            );

        window.history.pushState(
            null,
            "",
            `/company/company-search/results?${queryParams.toString()}`
        );

        searchCompanies({
            name: searchParams.company, 
            location: searchParams.location,
            categoryIds: searchParams.categoryIds,
        });
    };

    const handleFilterChange = async (newFilters) => {

        setApiResults([]);

        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);

        try {
            if (
                updatedFilters.categoryIds &&
                updatedFilters.categoryIds.length > 0
            ) {
                const categoryIds = updatedFilters.categoryIds.join(",");
                await fetchCompaniesByCategories(categoryIds);

                setUseDirectAPIResults(false); 
            } else {
                setUseDirectAPIResults(false);
                await fetchCompanies();
            }
        } catch (error) {
            console.error("Error updating filters:", error);
        }
    };

    // Logic phân trang
    const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
    const paginatedResults = filteredResults.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const toggleFilterOnMobile = () => {
        setShowFilterOnMobile(!showFilterOnMobile);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <SearchBar onSearch={handleSearch} initialValues={searchTerm} />
            </div>

            <div className="lg:hidden mb-4">
                <button
                    onClick={toggleFilterOnMobile}
                    className="w-full py-2 px-4 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    <Filter className="w-4 h-4" />
                    {showFilterOnMobile ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div
                    className={`${
                        showFilterOnMobile ? "block" : "hidden"
                    } lg:block lg:w-1/4`}
                >
                    <FilterSidebar
                        filters={filters}
                        setFilters={handleFilterChange}
                        industries={industries}
                        companySizes={companySizes}
                        filterCounts={filterCounts}
                    />
                </div>

                <div className="lg:w-3/4">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                            <Building className="mr-2 h-6 w-6 text-[#0A66C2]" />
                            Tất cả công ty
                        </h2>
                        <div className="flex flex-wrap items-center text-gray-600 gap-2">
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#0A66C2] mr-2"></div>
                                    Đang tải...
                                </div>
                            ) : (
                                <>
                                    <p>
                                        Hiển thị {filteredResults.length} kết
                                        quả
                                    </p>
                                    {searchTerm.company && (
                                        <div className="flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                                            <Search className="w-4 h-4 mr-1" />
                                            {searchTerm.company}
                                        </div>
                                    )}
                                    {searchTerm.location && (
                                        <div className="flex items-center bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {searchTerm.location}
                                        </div>
                                    )}
                                    {filters.categoryIds.length > 0 && (
                                        <div className="flex items-center bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm">
                                            <Filter className="w-4 h-4 mr-1" />
                                            {filters.categoryIds.length} danh
                                            mục đã lọc
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A66C2]"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-100">
                            <p className="text-red-500 mb-4">
                                Có lỗi xảy ra: {error}
                            </p>
                            <button
                                onClick={fetchCompanies}
                                className="px-4 py-2 bg-[#0A66C2] text-white rounded-md hover:bg-[#085aab]"
                            >
                                Thử lại
                            </button>
                        </div>
                    ) : filteredResults.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex justify-center mb-4">
                                <Building className="h-16 w-16 text-gray-300" />
                            </div>
                            <p className="text-gray-500 mb-4 text-lg font-medium">
                                Không tìm thấy công ty phù hợp với tiêu chí của
                                bạn.
                            </p>
                            <p className="text-gray-600">
                                Hãy điều chỉnh tìm kiếm hoặc bộ lọc của bạn.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm({
                                        company: "",
                                        location: "",
                                    });
                                    setFilters({
                                        companySize: [],
                                        categoryIds: [],
                                        foundingYear: "any",
                                    });
                                    router.push(
                                        "/company/company-search/results"
                                    );
                                }}
                                className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                            >
                                Xóa bộ lọc và tìm kiếm lại
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {paginatedResults.map((company) => (
                                <ResultItem
                                    key={company.id}
                                    company={company}
                                />
                            ))}

                            {/* Phân trang */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8">
                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                                            currentPage === 1
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                        aria-label="Trang trước"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    </button>

                                    {Array.from(
                                        { length: Math.min(totalPages, 5) },
                                        (_, i) => {
                                            // Hiển thị trang hiện tại và các trang xung quanh
                                            let pageNum = currentPage;
                                            if (pageNum <= 3) {
                                                pageNum = i + 1;
                                            } else if (
                                                pageNum >=
                                                totalPages - 2
                                            ) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = pageNum - 2 + i;
                                            }

                                            // Nếu trang nằm ngoài phạm vi, không hiển thị
                                            if (
                                                pageNum <= 0 ||
                                                pageNum > totalPages
                                            ) {
                                                return null;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() =>
                                                        handlePageChange(
                                                            pageNum
                                                        )
                                                    }
                                                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                                                        currentPage === pageNum
                                                            ? "bg-[#0A66C2] text-white"
                                                            : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        }
                                    )}

                                    {totalPages > 5 &&
                                        currentPage < totalPages - 2 && (
                                            <>
                                                {currentPage <
                                                    totalPages - 3 && (
                                                    <span className="px-2">
                                                        ...
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        handlePageChange(
                                                            totalPages
                                                        )
                                                    }
                                                    className="w-8 h-8 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
                                                >
                                                    {totalPages}
                                                </button>
                                            </>
                                        )}

                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                        className={`w-8 h-8 flex items-center justify-center rounded-md ${
                                            currentPage === totalPages
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                        aria-label="Trang sau"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultPageContent;
