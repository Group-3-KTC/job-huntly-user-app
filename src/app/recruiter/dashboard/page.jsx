"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Briefcase, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyGuard from "@/components/recruiter/CompanyGuard";
import { getMyCompany } from "@/services/companyService";
import { getRecruiterKpi, getRecruiterTrend } from "@/services/analyticsService";

const RecruiterDashboard = () => {
    const [companyId, setCompanyId] = useState(null);
    const [kpi, setKpi] = useState(null);
    const [trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const run = async () => {
            try {
                const res = await getMyCompany();
                const cid = res?.id || res?.company_id || res?.companyId || res?.company?.id;
                if (!cid) return;
                if (mounted) setCompanyId(cid);
                const k = await getRecruiterKpi(cid);
                if (mounted) setKpi(k);
                const to = new Date();
                const from = new Date();
                from.setDate(to.getDate() - 30);
                const points = await getRecruiterTrend(cid, from.toISOString().slice(0,10), to.toISOString().slice(0,10));
                if (mounted) setTrend(points || []);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        run();
        return () => { mounted = false; };
    }, []);

    const stats = useMemo(() => ([
        {
            title: "Active Jobs",
            value: kpi?.activeJobs ?? "-",
            icon: Briefcase,
            color: "bg-blue-500",
        },
        {
            title: "Total Applicants",
            value: kpi?.totalApplicants ?? "-",
            icon: Users,
            color: "bg-blue-400",
        },
        {
            title: "Applicants (30d)",
            value: kpi?.applicantsLast30Days ?? "-",
            icon: FileText,
            color: "bg-blue-300",
        },
    ]), [kpi]);

    return (
        <CompanyGuard>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-blue-700">Recruiter Dashboard</h1>
                    <p className="text-gray-500">Overview of your hiring activities</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, idx) => (
                        <Card key={idx} className="transition-shadow border border-gray-200 shadow-sm hover:shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <div className={`p-2 rounded-full text-white ${stat.color}`}>
                                    <stat.icon className="w-4 h-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Trend (simple) */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border border-gray-200">
                        <CardHeader>
                            <CardTitle>Applications Trend (30 days)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <div className="grid grid-cols-12 gap-1 h-full items-end">
                                    {trend.map((p, i) => (
                                        <div key={i} className="bg-blue-500/70" style={{ height: `${Math.min(100, p.count)}%` }} title={`${p.date}: ${p.count}`} />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li>Use Applicants page to manage new applications.</li>
                                <li>Create new job to boost your pipeline.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CompanyGuard>
    );
};

export default RecruiterDashboard;
