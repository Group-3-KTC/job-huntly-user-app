"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    useGetInterviewsForCandidateQuery,
    useUpdateInterviewStatusMutation,
} from "@/services/interviewService";
import { useGetApplicationDetailByJobQuery } from "@/services/applicationService";

import LoadingScreen from "@/components/ui/loadingScreen";
import {
    CalendarDays,
    Clock,
    Video,
    FileText,
    CheckCircle2,
    XCircle,
    Building2,
} from "lucide-react";

function StatusBadge({ status }) {
    const map = {
        PENDING: "bg-amber-100 text-amber-800 border-amber-200",
        ACCEPTED: "bg-emerald-100 text-emerald-800 border-emerald-200",
        DECLINED: "bg-rose-100 text-rose-800 border-rose-200",
        COMPLETED: "bg-gray-100 text-gray-700 border-gray-200",
        CANCELLED: "bg-gray-100 text-gray-500 border-gray-200",
    };
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold border rounded ${
                map[status] || "bg-gray-100 text-gray-700 border-gray-200"
            }`}
        >
            {status}
        </span>
    );
}

function formatDateTime(dt) {
    if (!dt) return "";
    const d = new Date(dt);
    return d.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function ApplicationMini({ jobId }) {
    const { data, isFetching, isError } =
        useGetApplicationDetailByJobQuery(jobId);

    if (isFetching)
        return <p className="text-sm text-gray-500">Loading application…</p>;
    if (isError)
        return (
            <p className="text-sm text-rose-600">
                Failed to load application details.
            </p>
        );
    if (!data)
        return <p className="text-sm text-gray-500">No application found.</p>;

    return (
        <div className="space-y-2 text-sm">
            <div>
                <strong>Status:</strong> {data.status}
            </div>
            {data.cv && (
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-500" />
                    <Link
                        href={data.cv}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                    >
                        View CV (PDF)
                    </Link>
                </div>
            )}
            {data.description && (
                <div>
                    <strong>Note:</strong> {data.description}
                </div>
            )}
            {data.createdAt && (
                <div>
                    <strong>Applied:</strong> {formatDateTime(data.createdAt)}
                </div>
            )}
        </div>
    );
}

export default function CandidateInterviewsPage() {
    const router = useRouter();
    const { data, isLoading, isError, refetch } =
        useGetInterviewsForCandidateQuery({
            page: 0,
            size: 20,
            sort: "scheduledAt,desc",
        });

    const [openAppJobId, setOpenAppJobId] = useState(null);
    const [updateStatus, { isLoading: updating }] =
        useUpdateInterviewStatusMutation();

    const list = useMemo(() => data?.content || [], [data]);

    async function onChangeStatus(interviewId, next) {
        try {
            await updateStatus({ interviewId, status: next }).unwrap();
            refetch();
        } catch (e) {
            console.error(e);
            alert("Failed to update status.");
        }
    }

    if (isLoading) return <LoadingScreen message="Loading interviews..." />;
    if (isError)
        return <p className="text-rose-600">Failed to load interview list.</p>;

    return (
        <div className="max-w-5xl mx-auto space-y-4">
            <div className="px-6 py-4 mb-4 border-b border-gray-100 bg-gradient-to-r from-blue-200 to-indigo-50 rounded-xl">
                <div className="max-w-6xl mx-auto">
                    <h1 className="pl-4 text-2xl font-bold text-gray-900 border-l-4 border-blue-800">
                        My interview schedule
                    </h1>
                </div>
            </div>

            {list.length === 0 && (
                <p className="text-center text-gray-600">
                    There is no interview scheduled yet. Start applying now.
                </p>
            )}

            {list.map((iv) => (
                <div key={iv.interviewId} className="space-y-2">
                    <div className="flex-col items-stretch w-full overflow-hidden bg-white border border-gray-200 shadow-sm md:flex md:flex-row rounded-xl hover:shadow-md hover:border-blue-300">
                        <div className="flex flex-col justify-between flex-1 p-4 sm:flex-row sm:items-center">
                            <div className="flex flex-col flex-1 space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="space-y-1">
                                        <p
                                            onClick={() =>
                                                router.push(
                                                    `/job-detail/${iv.jobId}`
                                                )
                                            }
                                            className="text-lg font-semibold text-blue-800 cursor-pointer hover:text-blue-600"
                                        >
                                            {iv.jobTitle}
                                        </p>
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <Building2 className="w-4 h-4 text-gray-500" />
                                            <span>{iv.companyName}</span>
                                        </div>
                                    </div>
                                    <StatusBadge status={iv.status} />
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="w-4 h-4 text-blue-600" />
                                        <span>
                                            {formatDateTime(iv.scheduledAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-600" />
                                        <span>
                                            Duration: {iv.durationMinutes}{" "}
                                            minutes
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {iv.meetingUrl ? (
                                        <Link
                                            href={iv.meetingUrl}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                        >
                                            <Video className="w-4 h-4" />
                                            Join meeting
                                        </Link>
                                    ) : (
                                        <span className="text-sm text-gray-500">
                                            The meeting link is not available
                                            yet.
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-400 rounded-md hover:bg-blue-50"
                                        onClick={() =>
                                            setOpenAppJobId(
                                                openAppJobId === iv.jobId
                                                    ? null
                                                    : iv.jobId
                                            )
                                        }
                                    >
                                        <FileText className="w-4 h-4" />
                                        {openAppJobId === iv.jobId
                                            ? "Hide Application"
                                            : "Application"}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between h-full gap-2 mt-4 sm:mt-0 sm:min-w-[180px]">
                                {iv.status === "PENDING" && (
                                    <div className="flex gap-2">
                                        <button
                                            disabled={updating}
                                            onClick={() =>
                                                onChangeStatus(
                                                    iv.interviewId,
                                                    "ACCEPTED"
                                                )
                                            }
                                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-md border-emerald-300 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            Accept
                                        </button>
                                        <button
                                            disabled={updating}
                                            onClick={() =>
                                                onChangeStatus(
                                                    iv.interviewId,
                                                    "DECLINED"
                                                )
                                            }
                                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-md border-rose-300 text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Decline
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {openAppJobId === iv.jobId && (
                        <div className="p-4 border border-blue-200 shadow-inner bg-gray-50 rounded-xl">
                            <ApplicationMini jobId={iv.jobId} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
