"use client";

import React, { useMemo, useCallback, useState } from "react";
import {
    MapPin,
    Briefcase,
    Layers,
    Heart,
    Flag,
    FileText,
    ListChecks,
    Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedJobs from "./relatedJobs";
import ApplicationModal from "./applicationJob";
import ReportModal from "./report";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; 
import { showLoginPrompt } from "@/features/auth/loginPromptSlice"; 
import { toast } from "react-toastify";

import Pill from "./_components/Pill";
import Section from "./_components/Section";
import CompanyCard from "./_components/CompanyCard";
import GeneralCard from "./_components/GeneralCard";
import SkillsChips from "./_components/SkillsChips";

import { formatList, toList } from "./_utils/formatters";
import { mapJobToView } from "./_utils/jobMapper";
import { isLoggedIn } from "./_utils/auth";

import {
    useGetStatusQuery,
    useSaveJobMutation,
    useUnsaveJobMutation,
} from "@/services/savedJobService";

export default function DetailJob({ job}) {
    const router = useRouter();
    const dispatch = useDispatch(); // Thêm dispatch để gọi showLoginPrompt
    const dj = useMemo(() => mapJobToView(job), [job]);
    const djId = dj?.id;

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    // --- new save job hooks ---
    const { data: status, isFetching } = useGetStatusQuery(djId, {
        skip: !djId,
    });
    const [saveJob, { isLoading: savingSave }] = useSaveJobMutation();
    const [unsaveJob, { isLoading: savingUnsave }] = useUnsaveJobMutation();

    const liked = status?.saved ?? false;
    const saving = savingSave || savingUnsave || isFetching;

    const openLogin = useCallback(() => router.push("/login"), [router]);

    const guardOr = useCallback(
        async (action) => {
            const logged = await isLoggedIn();
            if (!logged) {
                dispatch(showLoginPrompt());
                setShowApplyModal(false);
                setShowReportModal(false);
                return;
            }
            action?.();
        },
        [dispatch]
    );

    const handleApply = useCallback(
        () =>
            guardOr(() => {
                setShowReportModal(false);
                setShowApplyModal(true);
            }),
        [guardOr]
    );

    const handleFlagClick = useCallback(
        () =>
            guardOr(() => {
                setShowApplyModal(false);
                setShowReportModal(true);
                toast.info("Đã bỏ lưu công việc");
            }),
        [guardOr]
    );

    const handleSave = useCallback(
        () =>
            guardOr(async () => {
                try {
                    if (!djId) return;
                    if (!liked) {
                        await saveJob({ jobId: djId }).unwrap();
                        toast.success("Đã lưu công việc");
                    } else {
                        await unsaveJob(djId).unwrap();
                        toast.info("Đã bỏ lưu công việc");
                    }
                } catch (err) {
                    console.error("Toggle save error", err);
                    toast.info("Đã bỏ lưu công việc");
                }
            }),
        [djId, liked, saveJob, unsaveJob, guardOr]
    );

    return (
        <div className="w-full py-10 bg-gray-100">
            <div className="flex flex-col-reverse w-full gap-6 px-4 md:flex-row md:px-10">
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
                                <Button
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700"
                                    onClick={handleApply}
                                >
                                    Apply
                                </Button>
                                {showApplyModal && (
                                    <ApplicationModal
                                        onClose={() => setShowApplyModal(false)}
                                        jobId={dj.id}
                                        jobTitle={dj.title}
                                    />
                                )}
                            </div>

                            <div className="relative flex items-start justify-center col-span-1">
                                <Heart
                                    onClick={handleSave}
                                    className={`cursor-pointer hover:scale-110 transition ${
                                        liked
                                            ? "text-red-600 fill-red-600"
                                            : "text-gray-400"
                                    } ${
                                        saving
                                            ? "opacity-60 pointer-events-none"
                                            : ""
                                    }`}
                                    title={liked ? "Bỏ lưu" : "Lưu công việc"}
                                />
                            </div>

                            <div className="flex justify-center col-span-1">
                                <Flag
                                    className="text-gray-600 transition cursor-pointer hover:scale-110"
                                    onClick={handleFlagClick}
                                />
                            </div>

                            <ReportModal
                                open={showReportModal}
                                onClose={() => setShowReportModal(false)}
                            />
                        </div>
                    </div>

                    <Section icon={FileText} title="Job Description">
                        <p>{dj.description || "No description yet"}</p>
                    </Section>

                    <Section icon={ListChecks} title="Requirements">
                        <div className="space-y-1">
                            {toList(dj.requirements).length ? (
                                toList(dj.requirements).map((item, idx) => (
                                    <p key={idx}>- {item}</p>
                                ))
                            ) : (
                                <p>No detail for requirements</p>
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
                                <p>No detail for benefits</p>
                            )}
                        </div>
                    </Section>

                    <Section icon={MapPin} title="Work Location">
                        {dj.location ? (
                            <p>- {dj.location}</p>
                        ) : (
                            <p>Location Unknown</p>
                        )}
                    </Section>

                    <RelatedJobs category={dj.category} />
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
        </div>
    );
}
