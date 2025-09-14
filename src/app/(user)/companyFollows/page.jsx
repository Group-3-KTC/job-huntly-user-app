"use client";

import {
    useGetFollowedCompaniesByUserQuery,
    useUnfollowCompanyMutation,
} from "@/services/followCompanyService";
import Link from "next/link";
import { Eye, Trash2, Building2, Users, Briefcase } from "lucide-react";
import LoadingScreen from "@/components/ui/loadingScreen";

export default function ListCompanyFollowed() {
    const {
        data: followedCompanies = { content: [] },
        error,
        isLoading,
    } = useGetFollowedCompaniesByUserQuery();

    const [unfollowCompany] = useUnfollowCompanyMutation();

    const handleUnfollow = async (companyId) => {
        if (window.confirm("Are you sure you want to unfollow this company?")) {
            try {
                await unfollowCompany(companyId).unwrap();
            } catch (err) {
                console.error("Error while unfollowing company:", err);
            }
        }
    };

    if (isLoading) {
        return <LoadingScreen message="Loading company list..." />;
    }

    if (error) {
        const errorMessage =
            error?.data?.message || error?.error || "An error occurred";
        return (
            <div className="container max-w-6xl p-6 mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <div className="p-4 bg-red-100 rounded-full">
                        <Building2 className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="text-center">
                        <h2 className="mb-2 text-xl font-semibold text-red-600">
                            Unable to load data
                        </h2>
                        <p className="text-gray-600">Error: {errorMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    const companies = followedCompanies?.content || [];

    return (
        <div className="container">
            {/* Header Section */}
            <div className="px-6 py-4 mb-4 border-b border-gray-100 bg-gradient-to-r from-blue-200 to-indigo-50 rounded-xl">
                <div className="max-w-6xl mx-auto">
                    <h1 className="pl-4 text-2xl font-bold text-gray-900 border-l-4 border-blue-800">
                        Follow the companies you care about
                    </h1>
                </div>
            </div>

            {/* Companies List */}
            {companies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="p-6 mb-6 bg-gray-100 rounded-full">
                        <Building2 className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-600">
                        No companies yet
                    </h3>
                    <p className="max-w-md text-center text-gray-500">
                        You haven’t followed any companies yet. Discover and
                        follow the ones you’re interested in.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {companies.map((company) => (
                        <div
                            key={company.companyId}
                            className="relative flex items-center px-4 py-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm z-2 group rounded-2xl hover:shadow-lg hover:border-blue-200"
                        >
                            <div className="flex-shrink-0 mr-6">
                                <img
                                    src={
                                        company.companyAvatar ||
                                        "https://static.topcv.vn/company_logos/default-logo.png"
                                    }
                                    alt={`${company.companyName} logo`}
                                    className="w-20 h-20 transition-shadow duration-300 object-inhertit rounded-xl group-hover:shadow-md"
                                />
                            </div>

                            <div className="justify-start flex-1 min-w-0">
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 truncate">
                                    {company.companyName}
                                </h3>

                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-gray-400" />
                                        <span className="text-lg">
                                            {company.quantityEmployee} employees
                                        </span>
                                    </div>

                                    <div className="flex items-center text-gray-500">
                                        <Briefcase className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-gray-400" />
                                        <span>
                                            {company.jobsCount} open jobs
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center flex-shrink-0 ml-6 space-x-3">
                                <Link
                                    href={`/company/company-detail/${company.companyId}`}
                                    className="flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                                    aria-label={`View details of ${company.companyName}`}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </Link>

                                <button
                                    onClick={() =>
                                        handleUnfollow(company.companyId)
                                    }
                                    className="p-2.5 cursor-pointer text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group/delete"
                                    aria-label={`Unfollow ${company.companyName}`}
                                >
                                    <Trash2 className="w-4 h-4 transition-transform duration-200 group-hover/delete:scale-110" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
