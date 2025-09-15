"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Search, MapPin, Building, Tag, X, ChevronDown, Loader2 } from "lucide-react";
import useCompanySearchStore from "../store/companySearchStore";

// Custom hook for debouncing
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const SearchBar = ({
    onSearch,
    initialValues = { company: "", location: "", categoryIds: [] },
}) => {
    const { locations, industries, fetchLocations, fetchIndustries, isLoading } =
        useCompanySearchStore();

    const [searchParams, setSearchParams] = useState({
        company: initialValues.company || "",
        location: initialValues.location || "",
        categoryIds: initialValues.categoryIds || [],
    });

    const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
    const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categorySearchTerm, setCategorySearchTerm] = useState("");
    const [isCategoryInputFocused, setIsCategoryInputFocused] = useState(false);

    // Refs for positioning dropdowns
    const companyRef = useRef(null);
    const locationRef = useRef(null);
    const categoryRef = useRef(null);
    const containerRef = useRef(null);
    
    // Ref to track if we're updating from initialValues to prevent loops
    const isUpdatingFromInitial = useRef(false);
    // Ref to track if selectedCategories has been initialized
    const hasInitializedCategories = useRef(false);

    // Create stable reference for categoryIds to prevent infinite re-renders
    const stableCategoryIds = useMemo(() => {
        return initialValues.categoryIds || [];
    }, [JSON.stringify(initialValues.categoryIds || [])]);

    // Debounced search terms for better performance
    const debouncedCompany = useDebounce(searchParams.company, 300);
    const debouncedLocation = useDebounce(searchParams.location, 300);
    const debouncedCategorySearch = useDebounce(categorySearchTerm, 200);

    // Load data on mount
    useEffect(() => {
        if (industries.length === 0) {
            fetchIndustries();
        }
        if (locations.length === 0) {
            fetchLocations();
        }
    }, [fetchIndustries, fetchLocations]);

    // Update searchParams when initialValues change - FIXED
    useEffect(() => {
        const hasChanged = 
            initialValues.company !== searchParams.company ||
            initialValues.location !== searchParams.location ||
            JSON.stringify(stableCategoryIds) !== JSON.stringify(searchParams.categoryIds);

        if (hasChanged && !isUpdatingFromInitial.current) {
            isUpdatingFromInitial.current = true;
            setSearchParams({
                company: initialValues.company || "",
                location: initialValues.location || "",
                categoryIds: stableCategoryIds,
            });
            // Reset the flag after a short delay
            setTimeout(() => {
                isUpdatingFromInitial.current = false;
            }, 100);
        }
    }, [initialValues.company, initialValues.location, stableCategoryIds]);

    // Initialize selectedCategories from initialValues - FIXED TO PREVENT INFINITE LOOP
    useEffect(() => {
        // Only run if industries are loaded and we haven't initialized yet, or if categoryIds actually changed
        if (industries.length > 0) {
            const currentCategoryIds = selectedCategories.map(cat => cat.cate_id).sort();
            const newCategoryIds = stableCategoryIds.slice().sort();
            
            // Only update if the category IDs have actually changed
            if (JSON.stringify(currentCategoryIds) !== JSON.stringify(newCategoryIds)) {
                if (stableCategoryIds.length > 0) {
                    const newSelectedCategories = industries.filter((ind) =>
                        stableCategoryIds.includes(ind.cate_id)
                    );
                    setSelectedCategories(newSelectedCategories);
                } else {
                    setSelectedCategories([]);
                }
                hasInitializedCategories.current = true;
            } else if (!hasInitializedCategories.current && stableCategoryIds.length === 0) {
                // Initialize empty state if no categories selected
                setSelectedCategories([]);
                hasInitializedCategories.current = true;
            }
        }
    }, [industries.length > 0 ? industries : [], stableCategoryIds.join(',')]);

    // Memoized filtered locations
    const filteredLocations = useMemo(() => {
        if (!debouncedLocation) return locations.slice(0, 8);
        return locations
            .filter((location) =>
                location.toLowerCase().includes(debouncedLocation.toLowerCase())
            )
            .slice(0, 8);
    }, [locations, debouncedLocation]);

    // Memoized filtered industries
    const filteredIndustries = useMemo(() => {
        if (!debouncedCategorySearch) return industries.slice(0, 10);
        return industries
            .filter((industry) =>
                industry.cate_name.toLowerCase().includes(debouncedCategorySearch.toLowerCase())
            )
            .slice(0, 10);
    }, [industries, debouncedCategorySearch]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowCompanySuggestions(false);
                setShowLocationSuggestions(false);
                setShowCategorySuggestions(false);
                setIsCategoryInputFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle input changes with debouncing
    const handleInputChange = useCallback((field, value) => {
        console.log(`Input changed - Field: ${field}, Value: "${value}"`); // Debug log
        setSearchParams((prev) => {
            const newParams = {
                ...prev,
                [field]: value,
            };
            console.log("New search params:", newParams); // Debug log
            return newParams;
        });

        if (field === "location") {
            setShowLocationSuggestions(true);
            setShowCompanySuggestions(false);
            setShowCategorySuggestions(false);
        } else if (field === "company") {
            setShowCompanySuggestions(true);
            setShowLocationSuggestions(false);
            setShowCategorySuggestions(false);
        }
    }, []);

    // Handle category search
    const handleCategorySearch = useCallback((value) => {
        setCategorySearchTerm(value);
        setShowCategorySuggestions(true);
        setShowCompanySuggestions(false);
        setShowLocationSuggestions(false);
    }, []);

    // Handle category input focus
    const handleCategoryFocus = useCallback(() => {
        setShowCategorySuggestions(true);
        setShowCompanySuggestions(false);
        setShowLocationSuggestions(false);
        setIsCategoryInputFocused(true);
    }, []);

    // Handle location selection
    const handleLocationSelect = useCallback((location) => {
        console.log("Location selected:", location); // Debug log
        setSearchParams((prev) => ({
            ...prev,
            location,
        }));
        setShowLocationSuggestions(false);
    }, []);

    // Handle category toggle
    const handleCategoryToggle = useCallback((category) => {
        console.log("Category toggled:", category); // Debug log
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

        console.log("New selected categories:", newSelectedCategories); // Debug log

        // Update selectedCategories immediately for UI
        setSelectedCategories(newSelectedCategories);
        
        // Update searchParams for form submission
        setSearchParams((prev) => ({
            ...prev,
            categoryIds: newSelectedCategories.map((cat) => cat.cate_id),
        }));
        
        // Clear search term and close dropdown after selection
        setCategorySearchTerm("");
        setShowCategorySuggestions(false);
    }, [selectedCategories]);

    // Handle remove category
    const handleRemoveCategory = useCallback((categoryId) => {
        const newSelectedCategories = selectedCategories.filter(
            (cat) => cat.cate_id !== categoryId
        );
        setSelectedCategories(newSelectedCategories);
        setSearchParams((prev) => ({
            ...prev,
            categoryIds: newSelectedCategories.map((cat) => cat.cate_id),
        }));
    }, [selectedCategories]);

    // Handle form submission
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log("Submitting search params:", searchParams); // Debug log
        onSearch(searchParams);
        setShowCompanySuggestions(false);
        setShowLocationSuggestions(false);
        setShowCategorySuggestions(false);
        setIsCategoryInputFocused(false);
    }, [onSearch, searchParams]);

    // Handle clear all
    const handleClearAll = useCallback(() => {
        setSearchParams({
            company: "",
            location: "",
            categoryIds: [],
        });
        setSelectedCategories([]);
        setCategorySearchTerm("");
        setIsCategoryInputFocused(false);
    }, []);

    // Get display text for category input
    const getCategoryDisplayText = () => {
        if (selectedCategories.length === 0) return "";
        if (selectedCategories.length === 1) return selectedCategories[0].cate_name;
        return `${selectedCategories.length} ngành nghề đã chọn`;
    };

    // Get the actual value to display in category input - SIMPLIFIED LOGIC
    const getCategoryInputValue = () => {
        // If user is actively typing, show the search term
        if (isCategoryInputFocused && categorySearchTerm) {
            return categorySearchTerm;
        }
        // Otherwise, show the selected categories
        return getCategoryDisplayText();
    };

    return (
        <div className="w-full max-w-6xl mx-auto" ref={containerRef}>
            {/* Main Search Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6 relative">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {/* Header */}
                    <div className="text-center mb-4 md:mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Tìm kiếm công ty
                        </h1>
                        <p className="text-sm md:text-base text-gray-600">
                            Khám phá các công ty phù hợp với sở thích và kỹ năng của bạn
                        </p>
                    </div>

                    {/* Search Inputs - All in one row */}
                    <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
                        {/* Company Name Input */}
                        <div className="relative group flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                                <Building className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                ref={companyRef}
                                type="text"
                                placeholder="Tên công ty..."
                                value={searchParams.company}
                                onChange={(e) => {
                                    console.log("Company input onChange triggered:", e.target.value); // Debug log
                                    handleInputChange("company", e.target.value);
                                }}
                                onFocus={() => {
                                    setShowCompanySuggestions(true);
                                    setShowLocationSuggestions(false);
                                    setShowCategorySuggestions(false);
                                }}
                                className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm md:text-base"
                            />
                        </div>

                        {/* Location Input */}
                        <div className="relative group flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                ref={locationRef}
                                type="text"
                                placeholder="Địa điểm..."
                                value={searchParams.location}
                                onChange={(e) => {
                                    console.log("Location input onChange triggered:", e.target.value); // Debug log
                                    handleInputChange("location", e.target.value);
                                }}
                                onFocus={() => {
                                    setShowLocationSuggestions(true);
                                    setShowCompanySuggestions(false);
                                    setShowCategorySuggestions(false);
                                }}
                                className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm md:text-base"
                            />
                            
                            {/* Location Dropdown - Positioned under this input */}
                            {showLocationSuggestions && filteredLocations.length > 0 && (
                                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto top-full left-0">
                                    {filteredLocations.map((location, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleLocationSelect(location);
                                            }}
                                            className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 transition-colors first:rounded-t-xl last:rounded-b-xl text-sm md:text-base"
                                        >
                                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <span className="text-gray-700 truncate">{location}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Category Selection */}
                        <div className="relative group flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                                <Tag className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                ref={categoryRef}
                                type="text"
                                placeholder="Chọn ngành nghề..."
                                value={getCategoryInputValue()}
                                onChange={(e) => {
                                    console.log("Category input onChange triggered:", e.target.value); // Debug log
                                    handleCategorySearch(e.target.value);
                                }}
                                onFocus={handleCategoryFocus}
                                onBlur={() => {
                                    // Delay to allow click on dropdown items
                                    setTimeout(() => {
                                        setIsCategoryInputFocused(false);
                                    }, 200);
                                }}
                                className="w-full pl-10 md:pl-12 pr-10 py-3 md:py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm md:text-base"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center pointer-events-none">
                                <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                            </div>
                            
                            {/* Category Dropdown - Positioned under this input */}
                            {showCategorySuggestions && filteredIndustries.length > 0 && (
                                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto top-full left-0">
                                    {filteredIndustries.map((industry) => (
                                        <button
                                            key={industry.cate_id}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleCategoryToggle(industry);
                                            }}
                                            className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 transition-colors first:rounded-t-xl last:rounded-b-xl text-sm md:text-base"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.some(
                                                    (cat) => cat.cate_id === industry.cate_id
                                                )}
                                                onChange={() => {}}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                                            />
                                            <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            <span className="text-gray-700 truncate">{industry.cate_name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 lg:flex-col xl:flex-row">
                            <button
                                type="button"
                                onClick={handleClearAll}
                                className="px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 font-semibold text-sm md:text-base whitespace-nowrap"
                            >
                                Xóa tất cả
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base whitespace-nowrap"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                                ) : (
                                    <Search className="w-4 h-4 md:w-5 md:h-5" />
                                )}
                                {isLoading ? "Đang tìm..." : "Tìm kiếm"}
                            </button>
                        </div>
                    </div>

                    {/* Selected Categories */}
                    {selectedCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((category) => (
                                <span
                                    key={category.cate_id}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-800 text-xs md:text-sm rounded-full border border-blue-200"
                                >
                                    <Tag className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate max-w-32 md:max-w-none">{category.cate_name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCategory(category.cate_id)}
                                        className="ml-1 hover:text-blue-600 transition-colors flex-shrink-0"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </form>
            </div>

            {/* Quick Search Tags */}
            <div className="mt-4 md:mt-6">
                <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Tìm kiếm nhanh:</h3>
                <div className="flex flex-wrap gap-2">
                    {["Công nghệ thông tin", "Marketing", "Kế toán", "Nhân sự", "Kinh doanh"].map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => {
                                const industry = industries.find(ind => ind.cate_name === tag);
                                if (industry) {
                                    handleCategoryToggle(industry);
                                }
                            }}
                            className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;