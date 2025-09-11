"use client";
import { useGetApplicationsByUserQuery } from "@/services/applicationService";
import { Button } from "@/components/ui/button";
import {
    DollarSign,
    Clock,
    CalendarDays,
    Eye,
    FileText,
    Building2,
} from "lucide-react";
import Link from "next/link";
import LoadingScreen from "@/components/ui/loadingScreen";
import ApplicationBadge from "@/components/ui/ApplicationBadge";

function formatDate(dateTimeString) {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return `${date.toLocaleDateString("vi-VN")} ${date.toLocaleTimeString(
        "vi-VN",
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    )}`;
}

export default function AppliedPage() {
    const { data, isLoading, isError } = useGetApplicationsByUserQuery({
        page: 0,
        size: 10,
    });

    if (isLoading) return <LoadingScreen message="Loading ..." />;
    if (isError)
        return <p className="text-red-600">Error loading applications</p>;

    return (
        <div className="max-w-5xl p-4 mx-auto space-y-4">
            {data?.content?.length === 0 && (
                <p className="text-center text-gray-600">
                    Bạn chưa ứng tuyển công việc nào.
                </p>
            )}

            {data?.content?.map((job) => (
                <div
                    key={job.applicationId}
                    className="flex-col items-stretch w-full mb-4 overflow-hidden bg-white border border-gray-200 shadow-sm cursor-pointer md:flex md:flex-row rounded-xl hover:shadow-md hover:border-blue-300"
                >
                    <div className="flex-shrink-0 w-full h-40 md:w-32 md:h-auto">
                        <img
                            src={job.companyAvatar}
                            alt={job.companyName}
                            className="w-full h-full bg-white object-inherit"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col justify-between flex-1 p-4 sm:flex-row sm:items-center">
                        <div className="flex flex-col flex-1 space-y-3">
                            {/* Job Title */}
                            <Link
                                href={`/job-detail/${job.jobId}`}
                                className="text-xl font-bold text-blue-800 hover:text-blue-600"
                            >
                                {job.title}
                            </Link>

                            {/* Company */}
                            <div className="flex items-center gap-1 text-gray-600">
                                <Building2 className="w-4 h-4 text-gray-500" />
                                <Link
                                    href={`/company/company-detail/${job.companyId}`}
                                    className="underline underline-offset-2 hover:text-blue-700"
                                >
                                    {job.companyName}
                                </Link>
                            </div>

                            {/* Job Meta Info + View CV */}
                            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-700">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        <span>
                                            Applied: {formatDate(job.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 font-semibold text-red-600">
                                        <CalendarDays className="w-4 h-4" />
                                        <span>Expired: {job.expiredDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-green-600" />
                                        <span>Salary: {job.salaryDisplay}</span>
                                    </div>
                                </div>

                                {job.cv && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 text-red-600 border-red-400 hover:bg-red-50"
                                        asChild
                                    >
                                        <Link
                                            href={job.cv}
                                            target="_blank"
                                            className="flex items-center gap-2"
                                        >
                                            <FileText className="w-4 h-4 text-red-500" />
                                            <span>View CV (PDF)</span>
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-end justify-between h-full gap-3 mt-4 sm:mt-0 sm:min-w-[140px]">
                            <ApplicationBadge
                                status={job.status}
                                className="ml-2"
                            />

                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 border-gray-300 rounded-lg hover:bg-gray-100"
                                asChild
                            >
                                <Link href={`/job-detail/${job.jobId}`}>
                                    <Eye className="w-4 h-4" />
                                    <span>Your Job</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
