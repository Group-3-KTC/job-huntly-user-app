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
    const [showLocationSuggestions, setShowLocationSuggestions] =
        useState(false);
    const [showCategorySuggestions, setShowCategorySuggestions] =
        useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [filteredIndustries, setFilteredIndustries] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Thêm debug state để kiểm tra giá trị input
    const [debugInputs, setDebugInputs] = useState({
        company: "",
        location: "",
    });

    const locationRef = useRef(null);
    const companyRef = useRef(null);
    const categoryRef = useRef(null);

    // Chỉ cập nhật khi initialValues thay đổi và khác với giá trị hiện tại
    useEffect(() => {
        const companyChanged =
            initialValues.company !== searchParams.company &&
            initialValues.company !== undefined;
        const locationChanged =
            initialValues.location !== searchParams.location &&
            initialValues.location !== undefined;

        if (companyChanged || locationChanged) {
            setSearchParams((prev) => ({
                ...prev,
                company: initialValues.company || prev.company,
                location: initialValues.location || prev.location,
            }));
        }
    }, [initialValues.company, initialValues.location]);

    // Tải danh sách vị trí và ngành nghề
    useEffect(() => {
        fetchLocations();
        fetchIndustries();
        console.log("Fetching data...");
    }, [fetchLocations, fetchIndustries]);

    // Xử lý click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                locationRef.current &&
                !locationRef.current.contains(event.target)
            ) {
                setShowLocationSuggestions(false);
            }
            if (
                companyRef.current &&
                !companyRef.current.contains(event.target)
            ) {
                setShowCompanySuggestions(false);
            }
            if (
                categoryRef.current &&
                !categoryRef.current.contains(event.target)
            ) {
                setShowCategorySuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Sửa lại hàm handleChange để đảm bảo cập nhật state đúng cách
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed: ${name} = ${value}`); // Debug log

        // Cập nhật state chính
        setSearchParams((prev) => ({ ...prev, [name]: value }));

        // Cập nhật debug state
        setDebugInputs((prev) => ({ ...prev, [name]: value }));

        if (name === "location") {
            const filtered = locations.filter(
                (loc) => loc && loc.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredLocations(filtered);
            setShowLocationSuggestions(value.length > 0);
        } else if (name === "company") {
            setShowCompanySuggestions(value.length > 0);
        } else if (name === "category") {
            const filtered =
                value.trim() === ""
                    ? industries
                    : industries.filter((ind) =>
                          ind.cate_name
                              .toLowerCase()
                              .includes(value.toLowerCase())
                      );

            setFilteredIndustries(filtered);
            setShowCategorySuggestions(true);
        }
    };

    const handleLocationSelect = (location) => {
        setSearchParams((prev) => ({ ...prev, location }));
        setDebugInputs((prev) => ({ ...prev, location })); // Cập nhật cả debug
        setShowLocationSuggestions(false);
    };

    // Sửa lại hàm handleCategorySelect để chọn 1 ngành và tìm kiếm luôn
    const handleCategorySelect = (category) => {
        // Thêm category vào danh sách đã chọn
        const newSelected = [...selectedCategories, category];
        const newCategoryIds = newSelected.map((cat) => cat.cate_id);

        // Cập nhật state với category đã chọn
        setSearchParams((prev) => ({
            ...prev,
            categoryIds: newCategoryIds,
        }));
        setSelectedCategories(newSelected);

        // Đóng dropdown
        setShowCategorySuggestions(false);

        // Loại bỏ dòng này để không tự động tìm kiếm
        // onSearch(newSearchParams);
    };

    const handleRemoveCategory = (categoryId) => {
        const newSelected = selectedCategories.filter(
            (cat) => cat.cate_id !== categoryId
        );
        setSelectedCategories(newSelected);

        const newCategoryIds = newSelected.map((cat) => cat.cate_id);
        setSearchParams((prev) => ({ ...prev, categoryIds: newCategoryIds }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting search with params:", searchParams);
        onSearch(searchParams);
    };

    // Hàm reset bộ lọc
    const handleReset = () => {
        const cleared = { company: "", location: "", categoryIds: [] };
        setSearchParams(cleared);
        setSelectedCategories([]);
        setDebugInputs({ company: "", location: "" });
        onSearch?.(cleared);           // Gửi luôn kết quả rỗng (tuỳ nhu cầu)
    };

    console.log("Current search params:", searchParams); // Debug log
    console.log("Debug inputs:", debugInputs); // Debug log

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow-md"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Tên công ty */}
                <div className="md:col-span-3" ref={companyRef}>
                    <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Tên công ty
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Building className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={searchParams.company}
                            onChange={handleChange}
                            onFocus={() =>
                                setShowCompanySuggestions(
                                    searchParams.company.length > 0
                                )
                            }
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tên công ty..."
                            autoComplete="off"
                        />
                    </div>
                </div>

                {/* Ngành nghề */}
                <div className="md:col-span-3" ref={categoryRef}>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Ngành nghề
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Tag className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            onChange={handleChange}
                            onFocus={() => {
                                setFilteredIndustries(industries);
                                setShowCategorySuggestions(true);
                            }}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tìm ngành nghề..."
                            autoComplete="off"
                        />

                        {showCategorySuggestions && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                <div className="sticky top-0 bg-gray-100 px-4 py-2 font-medium border-b">
                                    Chọn ngành nghề để tìm kiếm
                                </div>
                                {filteredIndustries.length > 0 ? (
                                    filteredIndustries.map((industry) => (
                                        <div
                                            key={industry.cate_id}
                                            className="px-4 py-3 cursor-pointer hover:bg-blue-50 flex items-center border-b"
                                            onClick={() =>
                                                handleCategorySelect(industry)
                                            }
                                        >
                                            <Tag className="w-4 h-4 mr-2 text-blue-500" />
                                            <span>{industry.cate_name}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500">
                                        Không tìm thấy ngành nghề phù hợp
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Chỉ hiển thị ngành đã chọn ở bên dưới form thay vì trong input */}
                </div>

                {/* Địa điểm */}
                <div className="md:col-span-3" ref={locationRef}>
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Địa điểm
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MapPin className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={searchParams.location}
                            onChange={handleChange}
                            onFocus={() => {
                                // luôn hiển thị, đổ toàn bộ danh sách nếu input đang rỗng
                                setFilteredLocations(locations);
                                setShowLocationSuggestions(true);
                            }}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Địa điểm..."
                            autoComplete="off"
                        />

                        {/* Dropdown cho địa điểm */}
                        {showLocationSuggestions && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                <div className="sticky top-0 bg-gray-100 px-4 py-2 font-medium border-b">
                                    Chọn địa điểm
                                </div>
                                {filteredLocations.length > 0 ? (
                                    filteredLocations.map((loc, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-3 cursor-pointer hover:bg-blue-50 flex items-center border-b"
                                            onClick={() => handleLocationSelect(loc)}
                                        >
                                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                                            <span>{loc}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500">
                                        Không tìm thấy địa điểm phù hợp
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Nút tìm kiếm + xoá lọc */}
                <div className="md:col-span-3 flex flex-col sm:flex-row items-stretch gap-2 md:mt-6">
                    <button
                        type="submit"
                        className="w-full sm:w-auto h-[44px] px-6 bg-[#0A66C2] text-white font-medium text-base rounded-lg hover:bg-[#085aab] flex items-center justify-center whitespace-nowrap"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Tìm kiếm
                    </button>

                    {/* Nút xoá bộ lọc */}
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-full sm:w-auto h-[44px] px-6 bg-red-100 text-red-700 font-medium text-base rounded-lg hover:bg-red-200 flex items-center justify-center whitespace-nowrap"
                    >
                        <X className="w-5 h-5 mr-2" />
                        Xoá lọc
                    </button>
                </div>
            </div>

            {/* Hiển thị ngành nghề đã chọn ở bên ngoài grid */}
            {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCategories.map((category) => (
                        <div
                            key={category.cate_id}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded flex items-center"
                        >
                            <Tag className="w-3 h-3 mr-1.5 text-blue-600" />
                            <span>{category.cate_name}</span>
                            <button
                                type="button"
                                onClick={() =>
                                    handleRemoveCategory(category.cate_id)
                                }
                                className="ml-1.5 text-blue-800 hover:text-blue-900"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </form>
    );
};

export default SearchBar;
