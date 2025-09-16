"use client";

import {
    MapPin,
    CalendarDays,
    Clock,
    Briefcase,
    Layers,
    Monitor,
    Eye,
    BookmarkCheck,
    Bookmark,
    Building2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
    useLazyGetStatusQuery,
    useSaveJobMutation,
    useUnsaveJobMutation,
} from "@/services/savedJobService";
import { useGetApplyStatusQuery } from "@/services/applicationService";
import { useDispatch, useSelector } from "react-redux";
import { showLoginPrompt } from "@/features/auth/loginPromptSlice";
import ApplicationBadge from "@/components/ui/ApplicationBadge";
import { selectIsLoggedIn } from "@/features/auth/authSelectors";
import Image from "next/image";

export default function JobCardItem({ job, onToast, isGrid = false }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const router = useRouter();
    const dispatch = useDispatch();

    const [triggerGetStatus, { data, isFetching }] = useLazyGetStatusQuery();
    const [saveJob] = useSaveJobMutation();
    const [unsaveJob] = useUnsaveJobMutation();
    function parseCustomDate(dateString) {
        if (!dateString) return null;
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    function getPostedAgo(dateString) {
        if (!dateString) return null;
        const postDate = parseCustomDate(dateString);
        if (!postDate || isNaN(postDate)) return null;

        const now = new Date();
        const diffTime = now - postDate; // ms
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 1) return "Posted today";
        if (diffDays === 1) return "Posted 1 day ago";
        return `Posted ${diffDays} days ago`;
    }

    function getExpiredIn(dateString) {
        if (!dateString) return null;
        const expDate = parseCustomDate(dateString);
        if (!expDate || isNaN(expDate)) return null;

        const now = new Date();
        const diffTime = expDate - now; // ms
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Expired";
        if (diffDays === 0) return "Expires today";
        if (diffDays === 1) return "Expires in 1 day";
        return `Expires in ${diffDays} days`;
    }

    const {
        data: applyStatus,
        isLoading: isStatusLoading,
        refetch,
    } = useGetApplyStatusQuery(job?.id, {
        skip: !job?.id || !isLoggedIn,
    });

    useEffect(() => {
        if (isLoggedIn && job?.id) {
            triggerGetStatus(job.id);
            refetch();
        }
    }, [isLoggedIn, job?.id, triggerGetStatus, refetch]);

    const liked = isLoggedIn ? data?.saved ?? false : false;

    const guardOr = useCallback(
        (action) => {
            if (!isLoggedIn) {
                dispatch(showLoginPrompt());
                return;
            }
            action?.();
        },
        [dispatch, isLoggedIn]
    );

    const toggleSave = useCallback(
        (e) => {
            e.stopPropagation();
            if (!job?.id) return;

            guardOr(async () => {
                try {
                    if (!liked) {
                        await saveJob({ jobId: job.id }).unwrap();
                        onToast?.("Job saved successfully", "success");
                    } else {
                        await unsaveJob(job.id).unwrap();
                        onToast?.("Job removed from saved list", "neutral");
                    }
                    triggerGetStatus(job.id);
                } catch (err) {
                    console.error("Toggle save error", err);
                    onToast?.("Something went wrong", "error");
                }
            });
        },
        [job?.id, liked, saveJob, unsaveJob, onToast, guardOr, triggerGetStatus]
    );

    return (
        <div
            className={`${
                isGrid
                    ? "flex flex-col w-full p-4 bg-white border rounded-xl shadow-sm hover:shadow-md"
                    : "flex flex-col md:flex-row items-stretch w-full mb-4 overflow-hidden bg-white border shadow-sm rounded-xl hover:shadow-md"
            }`}
        >
            {/* Avatar */}
            <div
                className={`relative flex-shrink-0 ${
                    isGrid
                        ? "w-full h-48 mb-3"
                        : "w-full h-40 md:w-32 md:h-auto"
                }`}
            >
                <Image
                    src={job.company?.avatar}
                    alt={job.company?.company_name}
                    fill
                    className="bg-white object-inherit"
                />
            </div>

            {/* Nội dung */}
            <div
                className={`flex flex-col justify-between ${
                    isGrid
                        ? "space-y-2"
                        : "flex-1 p-4 sm:flex-row sm:items-start"
                }`}
            >
                {/* Job info */}
                <div className={`${isGrid ? "" : "flex-1 pr-4 space-y-2"}`}>
                    <h3
                        onClick={() => router.push(`/job-detail/${job.id}`)}
                        className="font-semibold text-lg text-[#0a66c2] hover:underline cursor-pointer"
                    >
                        {job.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 cursor-pointer">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span
                            onClick={() =>
                                router.push(
                                    `/company/company-detail/${job.company?.company_id}`
                                )
                            }
                            className="underline underline-offset-2 hover:text-blue-700"
                        >
                            {job.company?.company_name}
                        </span>
                    </div>

                    {/* Grid: chỉ hiện salary */}
                    {isGrid ? (
                        job.salaryDisplay && (
                            <p className="text-sm font-medium text-green-600">
                                {job.salaryDisplay}
                            </p>
                        )
                    ) : (
                        <>
                            {/* Normal full info */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                {job.location && (
                                    <span className="flex items-center gap-1">
                                        <MapPin size={12} /> {job.location}
                                    </span>
                                )}
                                {job.wards?.length > 0 && (
                                    <span className="flex items-center gap-1">
                                        <MapPin size={12} />{" "}
                                        {job.wards[0].ward_name}
                                    </span>
                                )}
                            </div>

                            {job.salaryDisplay && (
                                <div className="flex items-baseline gap-2">
                                    Salary:
                                    <p className="text-sm font-medium text-green-600">
                                        {job.salaryDisplay}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-2">
                                {job.skill_names
                                    ?.slice(0, 3)
                                    .map((skill, i) => (
                                        <span
                                            key={i}
                                            className="bg-blue-50 border border-[#0a66c2] text-[#0a66c2] text-xs px-2 py-0.5 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Right actions */}
                <div
                    className={`flex ${
                        isGrid
                            ? "items-start justify-between mt-2"
                            : "flex-col items-end justify-between h-full mt-4 sm:mt-0"
                    }`}
                >
                    <div
                        className={`flex items-center gap-3 ${
                            isGrid ? "text-xs justify-between" : "mb-4"
                        }`}
                    >
                        {job.date_post && (
                            <span className="flex items-center gap-1 leading-none">
                                <CalendarDays className="w-4 h-4 shrink-0" />
                                <span>{getPostedAgo(job.date_post)}</span>
                            </span>
                        )}
                        {job.expired_date && (
                            <span className="flex items-center gap-1 font-semibold leading-none text-red-600">
                                <Clock className="w-4 h-4 shrink-0" />
                                <span>{getExpiredIn(job.expired_date)}</span>
                            </span>
                        )}
                        <button
                            onClick={toggleSave}
                            className="flex items-center justify-center rounded-full hover:bg-blue-50"
                            disabled={isFetching}
                        >
                            {liked ? (
                                <BookmarkCheck
                                    size={20}
                                    className="text-blue-700 fill-blue-700"
                                />
                            ) : (
                                <Bookmark size={20} className="text-blue-700" />
                            )}
                        </button>
                    </div>

                    {!isGrid && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/job-detail/${job.id}`);
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-md bg-[#0a66c2] hover:bg-[#084c90] transition"
                        >
                            <Eye size={18} className="text-white" />
                            See Detail
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}