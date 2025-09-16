"use client";

import React, { useMemo } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Mail,
    Phone,
    Calendar,
    FileText,
    Building2,
    User2,
} from "lucide-react";

export default function ApplicationDetailModal({
    open,
    onOpenChange,
    application,
    jobName,
}) {
    const avatarSrc = useMemo(
        () =>
            application
                ? `https://i.pravatar.cc/80?u=${application.userId}`
                : "",
        [application]
    );
    const appliedAt = useMemo(
        () =>
            application ? new Date(application.createdAt).toLocaleString() : "",
        [application]
    );

    if (!application) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
                {/* Hidden title for accessibility */}
                <DialogTitle className="sr-only">
                    Application Detail
                </DialogTitle>
                {/* Header modern */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white">
                    <div className="flex items-center gap-4">
                        <img
                            src={avatarSrc}
                            alt="avatar"
                            className="w-14 h-14 rounded-full ring-2 ring-white/30"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-xl font-semibold truncate">
                                    {application.candidateName ||
                                        application.email ||
                                        "Candidate"}
                                </h3>
                                <span className="px-2.5 py-1 rounded-full text-xs bg-white/15 border border-white/25">
                                    {application.status}
                                </span>
                            </div>
                            <p className="text-white/80 mt-0.5 flex items-center gap-2">
                                <Building2 size={16} />
                                <span className="truncate">
                                    {jobName || `Job #${application.jobId}`}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    {/* Info grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4 bg-gray-50">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <User2 size={16} />
                                <span className="text-xs uppercase tracking-wider">
                                    Full Name
                                </span>
                            </div>
                            <div className="font-medium">
                                {application.candidateName || "—"}
                            </div>
                        </div>
                        <div className="rounded-lg border p-4 bg-gray-50">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Calendar size={16} />
                                <span className="text-xs uppercase tracking-wider">
                                    Applied
                                </span>
                            </div>
                            <div className="font-medium">{appliedAt}</div>
                        </div>
                        <div className="rounded-lg border p-4 bg-gray-50">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Mail size={16} />
                                <span className="text-xs uppercase tracking-wider">
                                    Email
                                </span>
                            </div>
                            <div className="font-medium break-all">
                                {application.email || "—"}
                            </div>
                        </div>
                        <div className="rounded-lg border p-4 bg-gray-50">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <Phone size={16} />
                                <span className="text-xs uppercase tracking-wider">
                                    Phone
                                </span>
                            </div>
                            <div className="font-medium">
                                {application.phoneNumber || "—"}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <FileText size={16} />
                            <span className="text-xs uppercase tracking-wider">
                                Candidate Description
                            </span>
                        </div>
                        <div className="whitespace-pre-wrap leading-relaxed">
                            {application.description || "Không có mô tả"}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                        {application.cv && (
                            <Button
                                variant="outline"
                                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                onClick={() =>
                                    window.open(application.cv, "_blank")
                                }
                            >
                                View CV
                            </Button>
                        )}
                        {application.cvDownload && (
                            <Button
                                variant="secondary"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() =>
                                    window.open(
                                        application.cvDownload,
                                        "_blank"
                                    )
                                }
                            >
                                Download CV
                            </Button>
                        )}
                        <div className="ml-auto">
                            <Button onClick={() => onOpenChange?.(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

