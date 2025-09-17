"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, DollarSign, Building2, Tags, Layers, Briefcase, Clock, Users } from "lucide-react";
import api from "@/lib/api";

export default function JobDetailModal({ open, onOpenChange, job, jobId }) {
    const [fullJob, setFullJob] = useState(job || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (!open) return;
            try {
                setLoading(true);
                const { data } = await api.get(`/job/${jobId}`);
                setFullJob(data);
            } catch {
                // fallback giữ dữ liệu cũ
            } finally {
                setLoading(false);
            }
        };
        if (jobId) load();
    }, [open, jobId]);

    const j = fullJob || job;
    if (!j) return null;
    const status = String(j.status || "").toLowerCase();
    const statusColor = status === "active" ? "bg-green-100 text-green-700" : status === "draft" ? "bg-gray-100 text-gray-700" : status === "inactive" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!w-[85vw] !max-w-[1400px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-gray-900">{j.title}</h2>
                            <Badge className={`${statusColor} capitalize px-3 py-1 text-sm font-medium`}>
                                {status}
                            </Badge>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                {/* Header Info - Horizontal Layout */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 text-gray-700">
                            <Building2 className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">{j.company?.company_name || j.company?.companyName}</span>
                        </div>
                        {j.location && (
                            <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="w-5 h-5 text-green-600" />
                                <span>{j.location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-700">
                            <DollarSign className="w-5 h-5 text-yellow-600" />
                            <span className="font-semibold">{j.salaryDisplay}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-5 h-5 text-purple-600" />
                            <span className="text-sm">Posted: {j.date_post}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content - Horizontal Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column - Job Details */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Description */}
                        {j.description && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                    Job Description
                                </h3>
                                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {j.description}
                                </div>
                            </div>
                        )}

                        {/* Requirements */}
                        {j.requirements && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-red-600" />
                                    Requirements
                                </h3>
                                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {j.requirements}
                                </div>
                            </div>
                        )}

                        {/* Benefits */}
                        {j.benefits && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                    Benefits
                                </h3>
                                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {j.benefits}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Tags and Info */}
                    <div className="space-y-6">
                        {/* Job Info Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span>Posted: {j.date_post}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span>Expires: {j.expired_date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        {Array.isArray(j.category_names) && j.category_names.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {j.category_names.map((s, i) => (
                                        <Badge key={i} variant="outline" className="px-3 py-1 text-sm">
                                            {s}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {Array.isArray(j.skill_names) && j.skill_names.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Tags className="w-5 h-5 text-purple-600" />
                                    Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {j.skill_names.map((s, i) => (
                                        <Badge key={i} className="px-3 py-1 text-sm bg-purple-100 text-purple-800 hover:bg-purple-200">
                                            {s}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Levels */}
                        {Array.isArray(j.level_names) && j.level_names.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-orange-600" />
                                    Experience Levels
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {j.level_names.map((s, i) => (
                                        <Badge key={i} variant="secondary" className="px-3 py-1 text-sm bg-orange-100 text-orange-800">
                                            {s}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Work Types */}
                        {Array.isArray(j.work_type_names) && j.work_type_names.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-green-600" />
                                    Work Types
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {j.work_type_names.map((s, i) => (
                                        <Badge key={i} variant="outline" className="px-3 py-1 text-sm border-green-200 text-green-800">
                                            {s}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-8">
                        <div className="flex items-center gap-2 text-gray-500">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span>Loading...</span>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
} 