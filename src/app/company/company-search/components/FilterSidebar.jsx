"use client";

import React, { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

const FilterSidebar = ({
    filters,
    setFilters,
    industries,
    companySizes,
    filterCounts,
}) => {
    const [expandedSections, setExpandedSections] = useState({
        industry: true,
        companySize: true,
        foundingYear: false,
    });

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleIndustryChange = (industryId) => {
        const newCategoryIds = filters.categoryIds.includes(industryId)
            ? filters.categoryIds.filter((id) => id !== industryId)
            : [...filters.categoryIds, industryId];

        setFilters({ categoryIds: newCategoryIds });
    };

    const handleCompanySizeChange = (size) => {
        const newSizes = filters.companySize.includes(size)
            ? filters.companySize.filter((s) => s !== size)
            : [...filters.companySize, size];

        setFilters({ companySize: newSizes });
    };

    const handleFoundingYearChange = (year) => {
        setFilters({ foundingYear: year });
    };

    const clearAllFilters = () => {
        setFilters({
            categoryIds: [],
            companySize: [],
            foundingYear: "any",
        });
    };

    const hasActiveFilters =
        filters.categoryIds.length > 0 ||
        filters.companySize.length > 0 ||
        filters.foundingYear !== "any";

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filter
                </h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                        <X className="w-4 h-4" />
                        Clear all
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {/* Industry Filter */}
                <div>
                    <button
                        onClick={() => toggleSection("industry")}
                        className="w-full flex items-center justify-between text-left font-medium text-gray-900 mb-3"
                    >
                        Industry
                        {expandedSections.industry ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>

                    {expandedSections.industry && (
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {industries.map((industry) => (
                                <label
                                    key={industry.cate_id}
                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.categoryIds.includes(
                                            industry.cate_id
                                        )}
                                        onChange={() =>
                                            handleIndustryChange(
                                                industry.cate_id
                                            )
                                        }
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 flex-1">
                                        {industry.cate_name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Company Size Filter */}
                <div>
                    <button
                        onClick={() => toggleSection("companySize")}
                        className="w-full flex items-center justify-between text-left font-medium text-gray-900 mb-3"
                    >
                        Company size
                        {expandedSections.companySize ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>

                    {expandedSections.companySize && (
                        <div className="space-y-2">
                            {companySizes.map((size) => (
                                <label
                                    key={size.id}
                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.companySize.includes(
                                            size.id
                                        )}
                                        onChange={() =>
                                            handleCompanySizeChange(size.id)
                                        }
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 flex-1">
                                        {size.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Founding Year Filter */}
                <div>
                    <button
                        onClick={() => toggleSection("foundingYear")}
                        className="w-full flex items-center justify-between text-left font-medium text-gray-900 mb-3"
                    >
                        Founded year
                        {expandedSections.foundingYear ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>

                    {expandedSections.foundingYear && (
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                                <input
                                    type="radio"
                                    name="foundingYear"
                                    value="any"
                                    checked={filters.foundingYear === "any"}
                                    onChange={(e) =>
                                        handleFoundingYearChange(e.target.value)
                                    }
                                    className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">
                                    All
                                </span>
                            </label>

                            {[
                                2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017,
                                2016, 2015,
                            ].map((year) => (
                                <label
                                    key={year}
                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                >
                                    <input
                                        type="radio"
                                        name="foundingYear"
                                        value={year}
                                        checked={
                                            filters.foundingYear ===
                                            year.toString()
                                        }
                                        onChange={(e) =>
                                            handleFoundingYearChange(
                                                e.target.value
                                            )
                                        }
                                        className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {year}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
