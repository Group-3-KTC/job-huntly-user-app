"use client";

import { create } from "zustand";
import { COMPANY_API } from "@/constants/apiCompanyConstants";

const useCompanySearchStore = create((set, get) => ({
    allCompanies: [],      // <— thêm
    companies: [],         // danh sách đang hiển thị
    industries: [],
    locations: [],
    isLoading: false,
    error: null,
    filters: {
        companySize: [],
        categoryIds: [],
        foundingYear: "any",
    },
    searchTerm: {
        company: "",
        location: "",
    },

    // Cập nhật filters
    setFilters: (newFilters) =>
        set({
            filters: { ...get().filters, ...newFilters },
        }),

    // Cập nhật searchTerm
    setSearchTerm: (newSearchTerm) =>
        set({
            searchTerm: { ...get().searchTerm, ...newSearchTerm },
        }),

    // Lấy danh sách công ty
    fetchCompanies: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(COMPANY_API.GET_ALL_COMPANIES);

            if (!response.ok) {
                throw new Error("Không thể tải danh sách công ty");
            }

            const data = await response.json();

            set({
                allCompanies: data, // lưu gốc
                companies:   data,  // hiển thị mặc định
                isLoading: false,
            });
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    },

    // Tìm kiếm công ty theo nhiều tiêu chí
    searchCompanies: async (params) => {
        set({ isLoading: true });
        try {
            // Sử dụng hàm SEARCH_COMPANIES đã định nghĩa sẵn
            const apiUrl = COMPANY_API.SEARCH_COMPANIES(params);
            console.log('API request URL:', apiUrl);
            
            const response = await fetch(apiUrl);

            if (response.status === 204) {
                set({
                    companies: [],
                    isLoading: false,
                    error: null
                });
                return;
            }

            if (!response.ok) {
                throw new Error("Không thể tìm kiếm công ty");
            }

            const data = await response.json();

            set({
                companies: data,
                isLoading: false,
            });
        } catch (err) {
            console.error("Search error:", err);
            set({ error: err.message, isLoading: false, companies: [] });
        }
    },

    // Lấy danh sách công ty theo danh mục
    fetchCompaniesByCategories: async (categoryIds) => {
        set({ isLoading: true });
        try {
            const response = await fetch(
                COMPANY_API.GET_COMPANIES_BY_CATEGORIES(categoryIds)
            );

            // Xử lý trường hợp 204 No Content
            if (response.status === 204) {
                set({
                    companies: [],
                    isLoading: false,
                    error: null
                });
                return;
            }

            if (!response.ok) {
                throw new Error(
                    "Không thể tải danh sách công ty theo danh mục"
                );
            }

            // Chỉ parse JSON khi có content
            const contentType = response.headers.get("content-type");
            let data = [];
            
            if (contentType && contentType.includes("application/json")) {
                try {
                    data = await response.json();
                } catch (jsonError) {
                    console.error("Error parsing JSON:", jsonError);
                    data = [];
                }
            }

            // Đảm bảo data luôn là mảng
            const companies = Array.isArray(data) ? data : [];

            set({ companies, isLoading: false, error: null });
        } catch (err) {
            set({ 
                error: err.message, 
                isLoading: false,
                companies: [] // Đặt mảng rỗng để tránh hiển thị dữ liệu cũ
            });
        }
    },

    // Lấy danh sách công ty theo địa điểm
    fetchCompaniesByLocation: async (location) => {
        set({ isLoading: true });
        try {
            const response = await fetch(
                COMPANY_API.GET_COMPANIES_BY_LOCATION(location)
            );

            if (!response.ok) {
                throw new Error(
                    "Không thể tải danh sách công ty theo địa điểm"
                );
            }

            const data = await response.json();

            set({
                companies: data,
                isLoading: false,
            });
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    },

    // Lấy danh sách ngành nghề (danh mục)
    fetchIndustries: async () => {
        try {
            // Sử dụng API mới để lấy danh sách danh mục
            const response = await fetch(COMPANY_API.GET_ALL_CATEGORIES);

            if (!response.ok) {
                throw new Error("Không thể tải danh sách ngành nghề");
            }

            const categories = await response.json();

            // Chuyển đổi dữ liệu từ API thành định dạng cần thiết
            const formattedCategories = categories.map((category) => ({
                cate_id: category.id,
                cate_name: category.name,
            }));

            set({ industries: formattedCategories });
        } catch (err) {
            console.error("Error fetching industries:", err);
        }
    },

    // Lấy danh sách vị trí
    fetchLocations: async () => {
        try {
            const response = await fetch(COMPANY_API.GET_COMPANY_LOCATIONS);

            if (!response.ok) {
                throw new Error("Không thể tải danh sách vị trí");
            }

            const data = await response.json();

            // Chuyển đổi từ mảng các object {name: "..."} thành mảng các chuỗi
            const locationNames = data.map((location) => location.name);

            set({ locations: locationNames });
        } catch (err) {
            console.error("Error fetching locations:", err);
        }
    },

    // Lọc các công ty dựa trên bộ lọc và từ khóa tìm kiếm
    getFilteredCompanies: () => {
        const { companies, filters, searchTerm, industries } = get();
        let filtered = [...companies];

        // Lọc theo tên công ty
        if (searchTerm.company) {
            const keyword = searchTerm.company.toLowerCase();
            filtered = filtered.filter((company) =>
                company.companyName.toLowerCase().includes(keyword)
            );
        }

        // Lọc theo vị trí
        if (searchTerm.location) {
            const locationKeyword = searchTerm.location.toLowerCase();
            filtered = filtered.filter(
                (company) =>
                    company.locationCity &&
                    company.locationCity.toLowerCase().includes(locationKeyword)
            );
        }

        // Lọc theo danh mục
        if (filters.categoryIds.length > 0) {
            // Lấy danh sách tên danh mục tương ứng với categoryIds đã chọn
            const selectedCategoryNames = industries
                .filter((ind) => filters.categoryIds.includes(ind.cate_id))
                .map((ind) => ind.cate_name);

            filtered = filtered.filter((company) => {
                // Kiểm tra khớp theo categoryIds (danh mục con)
                const matchById = company.categoryIds && company.categoryIds.some((id) => filters.categoryIds.includes(id));
                // Kiểm tra khớp theo parentCategories (danh mục cha, so sánh tên)
                const matchByParent = company.parentCategories && company.parentCategories.some((name) => selectedCategoryNames.includes(name));
                return matchById || matchByParent;
            });
        }

        // Lọc theo quy mô công ty
        if (filters.companySize.length > 0) {
            filtered = filtered.filter((company) => {
                const size = parseInt(company.quantityEmployee, 10);

                return filters.companySize.some((range) => {
                    if (range === "1-10" && size >= 1 && size <= 10)
                        return true;
                    if (range === "11-50" && size >= 11 && size <= 50)
                        return true;
                    if (range === "51-200" && size >= 51 && size <= 200)
                        return true;
                    if (range === "201-500" && size >= 201 && size <= 500)
                        return true;
                    if (range === "501+" && size > 500) return true;
                    return false;
                });
            });
        }

        // Lọc theo năm thành lập
        if (filters.foundingYear !== "any") {
            const year = parseInt(filters.foundingYear, 10);
            filtered = filtered.filter(
                (company) => company.foundedYear === year
            );
        }

        return filtered;
    },

    // Lấy các công ty được đề xuất
    getRecommendedCompanies: () => {
        const { companies } = get();
        return companies.filter((company) => company.isProCompany).slice(0, 6);
    },

    // Tính toán số lượng cho bộ lọc
    getFilterCounts: () => {
        const { allCompanies, industries } = get();

        // Đếm công ty theo ngành
        const industryCounts = {};
        industries.forEach((industry) => {
            industryCounts[industry.cate_name] = allCompanies.filter(
                (company) =>
                    // Kiểm tra trong cả categories và parentCategories
                    (company.categories &&
                        company.categories.includes(industry.cate_name)) ||
                    (company.parentCategories &&
                        company.parentCategories.includes(industry.cate_name))
            ).length;
        });

        // Đếm công ty theo quy mô
        const sizeCounts = {
            "1-10": allCompanies.filter((c) => {
                const size = parseInt(c.quantityEmployee, 10);
                return size >= 1 && size <= 10;
            }).length,
            "11-50": allCompanies.filter((c) => {
                const size = parseInt(c.quantityEmployee, 10);
                return size >= 11 && size <= 50;
            }).length,
            "51-200": allCompanies.filter((c) => {
                const size = parseInt(c.quantityEmployee, 10);
                return size >= 51 && size <= 200;
            }).length,
            "201-500": allCompanies.filter((c) => {
                const size = parseInt(c.quantityEmployee, 10);
                return size >= 201 && size <= 500;
            }).length,
            "501+": allCompanies.filter((c) => {
                const size = parseInt(c.quantityEmployee, 10);
                return size > 500;
            }).length,
        };

        return {
            industry: industryCounts,
            companySize: sizeCounts,
        };
    },
}));

export default useCompanySearchStore;
