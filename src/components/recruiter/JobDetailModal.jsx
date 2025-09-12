"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, DollarSign, Building2, Tags, Layers, Briefcase } from "lucide-react";
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
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {j.title}
                        <Badge className={statusColor + " capitalize"}>{status}</Badge>
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="text-sm text-muted-foreground flex flex-wrap gap-3">
                            <div className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {j.company?.company_name || j.company?.companyName}</div>
                            {j.location && (<div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {j.location}</div>)}
                            <div className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {j.salaryDisplay}</div>
                        </div>
                        <div className="text-xs text-muted-foreground flex flex-wrap gap-3">
                            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Đăng: {j.date_post}</div>
                            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Hết hạn: {j.expired_date}</div>
                        </div>
                        {j.description && (
                            <div>
                                <div className="font-medium mb-1">Mô tả</div>
                                <div className="prose max-w-none text-sm leading-relaxed whitespace-pre-wrap">{j.description}</div>
                            </div>
                        )}
                        {j.requirements && (
                            <div>
                                <div className="font-medium mb-1">Yêu cầu</div>
                                <div className="prose max-w-none text-sm leading-relaxed whitespace-pre-wrap">{j.requirements}</div>
                            </div>
                        )}
                        {j.benefits && (
                            <div>
                                <div className="font-medium mb-1">Phúc lợi</div>
                                <div className="prose max-w-none text-sm leading-relaxed whitespace-pre-wrap">{j.benefits}</div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {Array.isArray(j.category_names) && j.category_names.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 font-medium mb-2"><Briefcase className="w-4 h-4" /> Danh mục</div>
                                <div className="flex flex-wrap gap-2">
                                    {j.category_names.map((s, i) => (
                                        <Badge key={i} variant="outline">{s}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {Array.isArray(j.skill_names) && j.skill_names.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 font-medium mb-2"><Tags className="w-4 h-4" /> Kỹ năng</div>
                                <div className="flex flex-wrap gap-2">
                                    {j.skill_names.map((s, i) => (
                                        <Badge key={i}>{s}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {Array.isArray(j.level_names) && j.level_names.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 font-medium mb-2"><Layers className="w-4 h-4" /> Cấp bậc</div>
                                <div className="flex flex-wrap gap-2">
                                    {j.level_names.map((s, i) => (
                                        <Badge key={i} variant="secondary">{s}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {Array.isArray(j.work_type_names) && j.work_type_names.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 font-medium mb-2"><Briefcase className="w-4 h-4" /> Hình thức làm việc</div>
                                <div className="flex flex-wrap gap-2">
                                    {j.work_type_names.map((s, i) => (
                                        <Badge key={i} variant="outline">{s}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {loading && <div className="text-sm text-muted-foreground">Đang tải chi tiết...</div>}
            </DialogContent>
        </Dialog>
    );
} 