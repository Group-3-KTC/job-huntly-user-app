"use client";

import React, { useMemo, useState, useCallback } from "react";
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

import Pill from "./_components/Pill";
import Section from "./_components/Section";
import CompanyCard from "./_components/CompanyCard";
import GeneralCard from "./_components/GeneralCard";
import SkillsChips from "./_components/SkillsChips";
import LoginPromptModal from "./_components/LoginPromptModal";

import { formatList, toList } from "./_utils/formatters";
import { mapJobToView } from "./_utils/jobMapper";
import { isLoggedIn } from "./_utils/auth";

import useToast from "./_hooks/useToast";
import useSavedJob from "./_hooks/useSavedJob";

export default function DetailJob({ job }) {
    const router = useRouter();
    const dj = useMemo(() => mapJobToView(job), [job]);
    const djId = dj?.id;

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const { toast, showToast } = useToast();
    const { liked, saving, toggle } = useSavedJob(
        djId,
        () => setShowLoginPrompt(true),
        showToast
    );

    const openLogin = useCallback(() => router.push("/login"), [router]);

    const guardOr = useCallback(async (action) => {
        const logged = await isLoggedIn();
        if (!logged) {
            setShowLoginPrompt(true);
            setShowApplyModal(false);
            setShowReportModal(false);
            return;
        }
        setShowLoginPrompt(false);
        action?.();
    }, []);

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
            }),
        [guardOr]
    );

    return (
        <div className="w-full bg-gray-100 py-10">
            <LoginPromptModal
                open={showLoginPrompt}
                onClose={() => setShowLoginPrompt(false)}
                onLogin={openLogin}
            />

            <div className="w-full flex flex-col-reverse md:flex-row gap-6 px-4 md:px-10">
                {/* LEFT */}
                <div className="w-full md:w-[78%] flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {dj.title}
                        </h1>

                        <div className="flex flex-wrap gap-2 text-sm">
                            <Pill
                                icon={MapPin}
                                className="bg-blue-100 text-blue-800"
                            >
                                {dj.location || formatList(dj.city)}
                            </Pill>
                            <Pill
                                icon={Layers}
                                className="bg-purple-100 text-purple-800"
                            >
                                {formatList(dj.category)}
                            </Pill>
                            <Pill
                                icon={Briefcase}
                                className="bg-yellow-100 text-yellow-800"
                            >
                                {formatList(dj.level)}
                            </Pill>
                        </div>

                        <div className="grid grid-cols-10 items-center gap-2 mt-4">
                            <div className="col-span-8">
                                <Button
                                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
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

                            {/* Heart + toast */}
                            <div className="col-span-1 flex justify-center relative items-start">
                                {toast.open && (
                                    <div
                                        className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2
                                rounded-md px-2 py-1 text-xs font-medium text-white shadow
                                whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px]
                                ${
                                    toast.type === "success"
                                        ? "bg-green-600"
                                        : "bg-gray-600"
                                }`}
                                        title={toast.text}
                                    >
                                        {toast.text}
                                    </div>
                                )}

                                <Heart
                                    onClick={toggle}
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

                            <div className="col-span-1 flex justify-center">
                                <Flag
                                    className="text-gray-600 cursor-pointer hover:scale-110 transition"
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

                {/* RIGHT */}
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
