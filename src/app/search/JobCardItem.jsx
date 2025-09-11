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

export default function JobCardItem({ job, onToast }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const router = useRouter();
    const dispatch = useDispatch();

    const [triggerGetStatus, { data, isFetching }] = useLazyGetStatusQuery();
    const [saveJob] = useSaveJobMutation();
    const [unsaveJob] = useUnsaveJobMutation();

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
        <div className="flex flex-col items-stretch w-full mb-4 overflow-hidden bg-white border border-gray-200 shadow-sm md:flex-row rounded-xl hover:shadow-md">
            <div className="flex-shrink-0 w-full h-40 md:w-32 md:h-auto">
                <img
                    src={job.company?.avatar}
                    alt={job.company?.company_name}
                    className="w-full h-full bg-white object-inherit"
                />
            </div>

            <div className="flex flex-col justify-between flex-1 p-4 sm:flex-row sm:items-start">
                {/* Left: job info */}
                <div className="flex-1 pr-4 space-y-2">
                    <h3
                        className="font-semibold text-lg text-[#0a66c2] hover:underline cursor-pointer"
                        onClick={() => router.push(`/job-detail/${job.id}`)}
                    >
                        {job.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 cursor-pointer">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <h3
                            onClick={() =>
                                router.push(
                                    `/company/company-detail/${job.company?.company_id}`
                                )
                            }
                            className="underline underline-offset-2 hover:text-blue-700"
                        >
                            {job.company?.company_name}
                        </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        {job.location && (
                            <span className="flex items-center gap-1">
                                <MapPin size={12} /> {job.location}
                            </span>
                        )}
                        {job.wards?.length > 0 && (
                            <span className="flex items-center gap-1">
                                <MapPin size={12} /> {job.wards[0].ward_name}
                            </span>
                        )}
                        {job.date_post && (
                            <span className="flex items-center gap-1">
                                <CalendarDays size={12} /> {job.date_post}
                            </span>
                        )}
                        {job.expired_date && (
                            <span className="flex items-center gap-1 font-semibold text-red-600">
                                <Clock size={12} /> {job.expired_date}
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
                        {job.skill_names?.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-blue-50 border border-[#0a66c2] text-[#0a66c2] text-xs px-2 py-0.5 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        {job.category_names?.map((cat, idx) => (
                            <span
                                key={idx}
                                className="flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full"
                            >
                                <Layers size={12} /> {cat}
                            </span>
                        ))}
                        {job.level_names?.map((lvl, idx) => (
                            <span
                                key={idx}
                                className="flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full"
                            >
                                <Briefcase size={12} /> {lvl}
                            </span>
                        ))}
                        {job.work_type_names?.map((type, idx) => (
                            <span
                                key={idx}
                                className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full"
                            >
                                <Monitor size={12} /> {type}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col items-end justify-between h-full mt-4 sm:mt-0">
                    <div className="flex flex-col items-end gap-2 mb-4">
                        {/* Save luôn hiện */}
                        <button
                            onClick={toggleSave}
                            className="flex items-center justify-center rounded-full w-9 h-9 hover:bg-blue-50"
                            disabled={isFetching}
                        >
                            {liked ? (
                                <BookmarkCheck
                                    size={22}
                                    className="text-blue-700 fill-blue-700"
                                />
                            ) : (
                                <Bookmark size={22} className="text-blue-700" />
                            )}
                        </button>

                        {/* Applied badge chỉ hiện khi logged in */}
                        {isLoggedIn && !isStatusLoading && applyStatus?.applied && (
                            <ApplicationBadge status="Applied" />
                        )}
                    </div>

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
                </div>
            </div>
        </div>
    );
}
