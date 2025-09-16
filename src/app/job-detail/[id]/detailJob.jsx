"use client";

import React, { useMemo, useCallback, useState } from "react";
import {
    MapPin,
    Briefcase,
    Layers,
    FileText,
    ListChecks,
    Gift,
    BookmarkCheck,
    Bookmark,
    MessageSquareWarning,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedJobs from "./relatedJobs";
import ApplicationModal from "./applicationJob";
import ReportModal from "@/components/ui/report";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { selectIsLoggedIn } from "@/features/auth/authSelectors";
import { showLoginPrompt } from "@/features/auth/loginPromptSlice";
import { toast } from "react-toastify";

import Pill from "./_components/Pill";
import Section from "./_components/Section";
import CompanyCard from "./_components/CompanyCard";
import GeneralCard from "./_components/GeneralCard";
import SkillsChips from "./_components/SkillsChips";

import { formatList, toList } from "./_utils/formatters";
import { mapJobToView } from "./_utils/jobMapper";

import {
    useGetStatusQuery,
    useSaveJobMutation,
    useUnsaveJobMutation,
} from "@/services/savedJobService";
import { useGetApplyStatusQuery } from "@/services/applicationService";
import ApplicationDetail from "./_components/ApplicationDetail";

export default function DetailJob({ job }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const router = useRouter();
    const dispatch = useDispatch();
    const dj = useMemo(() => mapJobToView(job), [job]);
    const djId = dj?.id;
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const { data: status, isFetching } = useGetStatusQuery(djId, {
        skip: !djId || !isLoggedIn,
    });
    const liked = status?.saved ?? false;
    const [saveJob, { isLoading: savingSave }] = useSaveJobMutation();
    const [unsaveJob, { isLoading: savingUnsave }] = useUnsaveJobMutation();
    const saving = savingSave || savingUnsave || isFetching;

    const { data: applyStatus, isLoading: isLoadingApply } =
        useGetApplyStatusQuery(djId, {
            skip: !djId || !isLoggedIn,
        });
    const applied = applyStatus?.applied ?? false;

    const guardOr = useCallback(
        (action) => {
            if (!isLoggedIn) {
                dispatch(showLoginPrompt());
                setShowApplyModal(false);
                setShowReportModal(false);
                setShowDetailModal(false);
                return;
            }
            action?.();
        },
        [dispatch, isLoggedIn]
    );

    const handleApply = useCallback(
        () =>
            guardOr(() => {
                setShowReportModal(false);
                setShowDetailModal(false);
                setShowApplyModal(true);
            }),
        [guardOr]
    );

    const handleReapply = useCallback(
        () =>
            guardOr(() => {
                setShowReportModal(false);
                setShowDetailModal(false);
                setShowApplyModal(true);
            }),
        [guardOr]
    );

    const handleShowDetail = useCallback(
        () =>
            guardOr(() => {
                setShowApplyModal(false);
                setShowReportModal(false);
                setShowDetailModal(true);
            }),
        [guardOr]
    );

    const handleFlagClick = useCallback(
        () =>
            guardOr(() => {
                setShowApplyModal(false);
                setShowDetailModal(false);
                setShowReportModal(true);
            }),
        [guardOr]
    );

    const isExpired = useMemo(() => {
        if (!dj?.expiredDate) return false;

        const [day, month, year] = dj.expiredDate.split("-").map(Number);
        const expiredDate = new Date(year, month - 1, day);

        return expiredDate < new Date();
    }, [dj?.expiredDate]);

    const handleSave = useCallback(
        () =>
            guardOr(async () => {
                try {
                    if (!djId) return;
                    if (!liked) {
                        await saveJob({ jobId: djId }).unwrap();
                        toast.success("Job saved successfully");
                    } else {
                        await unsaveJob(djId).unwrap();
                        toast.info("Job unsaved");
                    }
                } catch (err) {
                    console.error("Toggle save error", err);
                    toast.error("Error while saving/unsaving job");
                }
            }),
        [djId, liked, saveJob, unsaveJob, guardOr]
    );

    return (
        <div className="w-full px-4 py-10 bg-gray-100 md:px-10">
            <div className="flex flex-col-reverse w-full gap-6 md:flex-row">
                <div className="w-full md:w-[78%] flex flex-col gap-6">
                    <div className="p-6 space-y-4 bg-white shadow-lg rounded-xl">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {dj.title}
                        </h1>

                        <div className="flex flex-wrap gap-2 text-sm">
                            <Pill
                                icon={MapPin}
                                className="text-blue-800 bg-blue-100"
                            >
                                {dj.location || formatList(dj.city)}
                            </Pill>
                            <Pill
                                icon={Layers}
                                className="text-purple-800 bg-purple-100"
                            >
                                {formatList(dj.category)}
                            </Pill>
                            <Pill
                                icon={Briefcase}
                                className="text-yellow-800 bg-yellow-100"
                            >
                                {formatList(dj.level)}
                            </Pill>
                        </div>

                        <div className="grid items-center grid-cols-10 gap-2 mt-4">
                            <div className="col-span-8">
                                {isLoadingApply ? (
                                    <p>Loading application status...</p>
                                ) : !applied ? (
                                    <Button
                                        disabled={isExpired}
                                        className={`w-full text-white ${
                                            isExpired
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                        onClick={handleApply}
                                    >
                                        Apply
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button
                                            disabled={isExpired}
                                            className={`flex-1 text-white ${
                                                isExpired
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-green-600 hover:bg-green-700"
                                            }`}
                                            onClick={handleReapply}
                                        >
                                            Reapply
                                        </Button>
                                        <Button
                                            className="flex-1 font-medium text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
                                            onClick={handleShowDetail}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                )}

                                {showApplyModal && (
                                    <ApplicationModal
                                        onClose={() => setShowApplyModal(false)}
                                        jobId={dj.id}
                                        jobTitle={dj.title}
                                        isReapply={applied}
                                    />
                                )}
                            </div>

                            <div className="relative flex items-start justify-center col-span-1">
                                {liked ? (
                                    <BookmarkCheck
                                        onClick={handleSave}
                                        size={22}
                                        className={`cursor-pointer hover:scale-110 transition text-blue-700 fill-blue-700 ${
                                            saving
                                                ? "opacity-60 pointer-events-none"
                                                : ""
                                        }`}
                                        title="Unsave"
                                    />
                                ) : (
                                    <Bookmark
                                        onClick={handleSave}
                                        size={22}
                                        className={`cursor-pointer hover:scale-110 transition text-gray-400 ${
                                            saving
                                                ? "opacity-60 pointer-events-none"
                                                : ""
                                        }`}
                                        title="Save Job"
                                    />
                                )}
                            </div>

                            <div className="flex justify-center col-span-1">
                                <MessageSquareWarning
                                    size={22}
                                    className="text-gray-600 transition cursor-pointer hover:scale-110"
                                    onClick={handleFlagClick}
                                />
                            </div>

                            <ReportModal
                                open={showReportModal}
                                onClose={() => setShowReportModal(false)}
                                type={0}
                                contentId={dj.id}
                            />
                        </div>

                        {applied && showDetailModal && (
                            <ApplicationDetail jobId={dj.id} />
                        )}
                    </div>

                    <Section icon={FileText} title="Job Description">
                        <p>{dj.description || "No description available"}</p>
                    </Section>

                    <Section icon={ListChecks} title="Requirements">
                        <div className="space-y-1">
                            {toList(dj.requirements).length ? (
                                toList(dj.requirements).map((item, idx) => (
                                    <p key={idx}>- {item}</p>
                                ))
                            ) : (
                                <p>No requirements information available</p>
                            )}
                        </div>
                    </Section>

                    <Section icon={Gift} title="Benefits">
                        <div className="space-y-1">
                            {toList(dj.benefits).length ? (
                                toList(dj.benefits).map((item, idx) => (
                                    <p key={idx}>- {item}</p>
                                ))
                            ) : (
                                <p>No benefits information available</p>
                            )}
                        </div>
                    </Section>

                    <Section icon={MapPin} title="Work Location">
                        {dj.location ? (
                            <p>- {dj.location}</p>
                        ) : (
                            <p>Location not specified</p>
                        )}
                    </Section>
                </div>

                <div className="w-full md:w-[22%] flex flex-col gap-4">
                    <CompanyCard
                        avatar={dj.avatar}
                        companyName={dj.companyName}
                        companyId={dj.companyId}
                    />
                    <GeneralCard
                        salary={dj.salaryDisplay}
                        postDate={dj.datePost}
                        expiredDate={dj.expiredDate}
                    />
                    <SkillsChips
                        skills={Array.isArray(dj.skill) ? dj.skill : []}
                    />
                </div>
            </div>
            <RelatedJobs category={dj.category} skill={dj.skill} />
        </div>
    );
}
