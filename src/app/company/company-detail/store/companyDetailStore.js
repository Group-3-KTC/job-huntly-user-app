"use client";

import { create } from "zustand";

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
            const response = await fetch(
                `https://68808ec2f1dcae717b627e5b.mockapi.io/companies/${companyId}`
            );

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
            const mockJobs = [
                {
                    id: "1",
                    title: "Chuyên Viên Pháp Lý",
                    company_id: companyId,
                    location: "Hà Nội",
                    salary: "Thỏa thuận",
                    remaining_days: 25,
                },
                {
                    id: "2",
                    title: "Kỹ Sư Quản Trị Dữ Liệu",
                    company_id: companyId,
                    location: "Hà Nội",
                    salary: "800 - 3,500 USD",
                    remaining_days: 13,
                },
            ];

            set({ jobs: mockJobs });
        } catch (error) {
            console.error("Error fetching company jobs:", error);
        }
    },

    // Lấy danh sách công ty cùng lĩnh vực
    fetchRelatedCompanies: async () => {
        try {
            const response = await fetch(
                "https://68808ec2f1dcae717b627e5b.mockapi.io/companies"
            );

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
                            item.industry === company.industry &&
                            item.company_id !== company.company_id
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
                } công ty: ${company.name}`
            );
        }
    },
}));

export default useCompanyDetailStore;
