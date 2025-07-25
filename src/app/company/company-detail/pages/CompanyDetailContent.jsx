"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import useCompanyDetailStore from "../store/companyDetailStore";

import CompanyBanner from "../components/CompanyBanner";
import CompanyDescription from "../components/CompanyDescription";
import CompanyJobs from "../components/CompanyJobs";
import RelatedCompanies from "../components/RelatedCompanies";
import ContactInfo from "../components/ContactInfo";
import ShareCompany from "../components/ShareCompany";

const CompanyDetailContent = () => {
    const { id } = useParams();
    const { fetchCompanyDetail, company, isLoading, error } =
        useCompanyDetailStore();

    useEffect(() => {
        if (id) {
            fetchCompanyDetail(id);
        }
    }, [id, fetchCompanyDetail]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg">
                    <h2 className="mb-2 text-xl font-bold">Đã xảy ra lỗi</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
                    <h2 className="mb-2 text-xl font-bold">
                        Không tìm thấy công ty
                    </h2>
                    <p>Công ty này không tồn tại hoặc đã bị xóa</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-w-full p-4 space-y-6 font-sans bg-[var(--color-background)]">
            <CompanyBanner />

            <div className="flex justify-center mt-10">
                <div className="flex flex-col w-full gap-6 lg:flex-row max-w-7xl">
                    <div className="space-y-6 lg:basis-2/3">
                        <CompanyDescription />
                        <CompanyJobs />
                        <RelatedCompanies />
                    </div>

                    <div className="space-y-6 lg:basis-1/3">
                        <ContactInfo />
                        <ShareCompany />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetailContent;
