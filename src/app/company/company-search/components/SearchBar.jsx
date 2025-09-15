"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Building, Tag, X } from "lucide-react";
import useCompanySearchStore from "../store/companySearchStore";

const SearchBar = ({
    onSearch,
    initialValues = { company: "", location: "", categoryIds: [] },
}) => {
    const { locations, industries, fetchLocations, fetchIndustries } =
        useCompanySearchStore();

    const [searchParams, setSearchParams] = useState({
        company: initialValues.company || "",
        location: initialValues.location || "",
        categoryIds: initialValues.categoryIds || [],
    });

    const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
    const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [filteredIndustries, setFilteredIndustries] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const locationRef = useRef(null);
    const companyRef = useRef(null);
    const categoryRef = useRef(null);

    // Load dữ liệu khi component mount
    useEffect(() => {
        if (industries.length === 0) {
            fetchIndustries();
        }
        if (locations.length === 0) {
            fetchLocations();
        }
    }, [fetchIndustries, fetchLocations]);

    // Cập nhật searchParams khi initialValues thay đổi (chỉ khi cần thiết)
    useEffect(() => {
        const hasChanged = 
            initialValues.company !== searchParams.company ||
            initialValues.location !== searchParams.location ||
            JSON.stringify(initialValues.categoryIds || []) !== JSON.stringify(searchParams.categoryIds);

        if (hasChanged) {
            setSearchParams({
                company: initialValues.company || "",
                location: initialValues.location || "",
                categoryIds: initialValues.categoryIds || [],
            });
        }
    }, [initialValues.company, initialValues.location, initialValues.categoryIds]);

    // Cập nhật selectedCategories khi industries hoặc categoryIds thay đổi
    useEffect(() => {
        if (industries.length > 0 && searchParams.categoryIds.length > 0) {
            const newSelectedCategories = industries.filter((ind) =>
                searchParams.categoryIds.includes(ind.cate_id)
            );
            setSelectedCategories(newSelectedCategories);
        } else if (searchParams.categoryIds.length === 0) {
            setSelectedCategories([]);
        }
    }, [industries, searchParams.categoryIds]);

    // Filter locations based on input
    useEffect(() => {
        if (searchParams.location) {
            const filtered = locations.filter((location) =>
                location.toLowerCase().includes(searchParams.location.toLowerCase())
            );
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations(locations.slice(0, 5));
        }
    }, [searchParams.location, locations]);

    // Filter industries based on input
    useEffect(() => {
        if (searchParams.categoryIds.length > 0) {
            const filtered = industries.filter((industry) =>
                industry.cate_name.toLowerCase().includes(
                    searchParams.categoryIds.join(" ").toLowerCase()
                )
            );
            setFilteredIndustries(filtered);
        } else {
            setFilteredIndustries(industries.slice(0, 5));
        }
    }, [searchParams.categoryIds, industries]);

    const handleInputChange = (field, value) => {
        setSearchParams((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === "location") {
            setShowLocationSuggestions(true);
            setShowCompanySuggestions(false);
            setShowCategorySuggestions(false);
        } else if (field === "company") {
            setShowCompanySuggestions(true);
            setShowLocationSuggestions(false);
            setShowCategorySuggestions(false);
        }
    };

    const handleLocationSelect = (location) => {
        setSearchParams((prev) => ({
            ...prev,
            location,
        }));
        setShowLocationSuggestions(false);
    };

    const handleCategoryToggle = (category) => {
        const isSelected = selectedCategories.some(
            (cat) => cat.cate_id === category.cate_id
        );

        let newSelectedCategories;
        if (isSelected) {
            newSelectedCategories = selectedCategories.filter(
                (cat) => cat.cate_id !== category.cate_id
            );
        } else {
            newSelectedCategories = [...selectedCategories, category];
        }

        setSelectedCategories(newSelectedCategories);
        setSearchParams((prev) => ({
            ...prev,
            categoryIds: newSelectedCategories.map((cat) => cat.cate_id),
        }));
    };

    const handleRemoveCategory = (categoryId) => {
        const newSelectedCategories = selectedCategories.filter(
            (cat) => cat.cate_id !== categoryId
        );
        setSelectedCategories(newSelectedCategories);
        setSearchParams((prev) => ({
            ...prev,
            categoryIds: newSelectedCategories.map((cat) => cat.cate_id),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchParams);
        setShowCompanySuggestions(false);
        setShowLocationSuggestions(false);
        setShowCategorySuggestions(false);
    };

    const handleClearAll = () => {
        setSearchParams({
            company: "",
            location: "",
            categoryIds: [],
        });
        setSelectedCategories([]);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Search Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company Name Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            ref={companyRef}
                            type="text"
                            placeholder="Tên công ty..."
                            value={searchParams.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            onFocus={() => setShowCompanySuggestions(true)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            ref={locationRef}
                            type="text"
                            placeholder="Địa điểm..."
                            value={searchParams.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            onFocus={() => setShowLocationSuggestions(true)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Category Selection */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        ref={categoryRef}
                        type="text"
                        placeholder="Chọn ngành nghề..."
                        onFocus={() => setShowCategorySuggestions(true)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        readOnly
                    />
                </div>

                {/* Selected Categories */}
                {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                            <span
                                key={category.cate_id}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                                {category.cate_name}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveCategory(category.cate_id)}
                                    className="ml-1 hover:text-blue-600"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                    >
                        <Search className="w-5 h-5" />
                        Tìm kiếm
                    </button>
                    <button
                        type="button"
                        onClick={handleClearAll}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Xóa tất cả
                    </button>
                </div>

                {/* Suggestions */}
                {showLocationSuggestions && filteredLocations.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredLocations.map((location, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleLocationSelect(location)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                            >
                                <MapPin className="w-4 h-4 text-gray-400" />
                                {location}
                            </button>
                        ))}
                    </div>
                )}

                {showCategorySuggestions && filteredIndustries.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredIndustries.map((industry) => (
                            <button
                                key={industry.cate_id}
                                type="button"
                                onClick={() => handleCategoryToggle(industry)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.some(
                                        (cat) => cat.cate_id === industry.cate_id
                                    )}
                                    onChange={() => {}}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <Tag className="w-4 h-4 text-gray-400" />
                                {industry.cate_name}
                            </button>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
