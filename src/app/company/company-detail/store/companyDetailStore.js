"use client";

import { create } from "zustand";
import { COMPANY_API, JOB_API } from "@/constants/apiCompanyConstants";

const useCompanyDetailStore = create((set, get) => ({
    company: null,
    relatedCompanies: [],
    jobs: [],
    isLoading: false,
    error: null,

    // Lấy chi tiết công ty theo ID
    fetchCompanyDetail: async (companyId) => {
        set({ isLoading: true });
        try {
            const response = await fetch(COMPANY_API.GET_COMPANY_DETAIL(companyId));

            if (!response.ok) {
                throw new Error("Không thể tải thông tin công ty");
            }

            const data = await response.json();

            set({ company: data, isLoading: false });

            // Sau khi tải công ty thành công, tải các việc làm và công ty liên quan
            get().fetchRelatedCompanies();
            get().fetchCompanyJobs(companyId);
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    // Lấy danh sách công việc của công ty
    fetchCompanyJobs: async (companyId) => {
        try {
            const response = await fetch(JOB_API.GET_JOBS_BY_COMPANY(companyId));

            if (!response.ok) {
                throw new Error("Không thể tải danh sách công việc");
                return;
            }

            const data = await response.json();
            
            // Trích xuất dữ liệu công việc từ response
            const jobs = data.content || [];
            
            set({ jobs });
        } catch (error) {
            console.error("Error fetching company jobs:", error);
        }
    },

    // Lấy danh sách công ty cùng lĩnh vực
    fetchRelatedCompanies: async () => {
        try {
            const response = await fetch(COMPANY_API.GET_ALL_COMPANIES);

            if (!response.ok) {
                throw new Error("Không thể tải danh sách công ty liên quan");
            }

            const data = await response.json();
            const company = get().company;

            if (company) {
                // Lọc ra các công ty cùng ngành nghề, trừ công ty hiện tại
                const related = data
                    .filter(
                        (item) =>
                            item.parentCategories && 
                            company.parentCategories &&
                            item.parentCategories.some(category => 
                                company.parentCategories.includes(category)
                            ) &&
                            item.id !== company.id
                    )
                    .slice(0, 10);

                set({ relatedCompanies: related });
            }
        } catch (error) {
            console.error("Error fetching related companies:", error);
        }
    },

    // Theo dõi/hủy theo dõi công ty
    toggleFollowCompany: () => {
        const company = get().company;
        if (company) {
            const updatedCompany = {
                ...company,
                isFollowing: !company.isFollowing,
            };
            set({ company: updatedCompany });

            console.log(
                `${
                    updatedCompany.isFollowing
                        ? "Đã theo dõi"
                        : "Đã hủy theo dõi"
                } công ty: ${company.companyName}`
            );
        }
    },
}));

export default useCompanyDetailStore;
