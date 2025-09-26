"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    Briefcase,
    Users,
    FileText,
    TrendingUp,
    Calendar,
    Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyGuard from "@/components/recruiter/CompanyGuard";
import { getMyCompany } from "@/services/companyService";
import {
    getRecruiterKpi,
    getRecruiterTrend,
} from "@/services/analyticsService";

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
                const cid =
                    res?.id ||
                    res?.company_id ||
                    res?.companyId ||
                    res?.company?.id;
                if (!cid) return;
                if (mounted) setCompanyId(cid);
                const k = await getRecruiterKpi(cid);
                if (mounted) setKpi(k);
                const to = new Date();
                const from = new Date();
                from.setDate(to.getDate() - 30);
                const points = await getRecruiterTrend(
                    cid,
                    from.toISOString().slice(0, 10),
                    to.toISOString().slice(0, 10)
                );
                if (mounted) setTrend(points || []);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        run();
        return () => {
            mounted = false;
        };
    }, []);
    // THÊM: tính ticks đẹp cho trục Y và niceMax dùng chung
    const yMeta = useMemo(() => {
        const max = Math.max(0, ...(trend || []).map((p) => p.count));
        const mag = Math.pow(10, Math.floor(Math.log10(Math.max(1, max))));
        const norm = max / mag;
        let niceUnit = 1;
        if (norm <= 1) niceUnit = 1;
        else if (norm <= 2) niceUnit = 2;
        else if (norm <= 5) niceUnit = 5;
        else niceUnit = 10;
        const niceMax = Math.max(1, niceUnit * mag); // tối thiểu 1

        const desiredTicks = 5; // 0, 1/4, 1/2, 3/4, 1
        const step = niceMax / (desiredTicks - 1);
        const ticks = Array.from({ length: desiredTicks }, (_, i) =>
            Math.round(i * step)
        );
        return { niceMax, ticks };
    }, [trend]);

    const stats = useMemo(
        () => [
            {
                title: "Active Jobs",
                value: kpi?.activeJobs ?? "-",
                icon: Briefcase,
                color: "bg-blue-500",
                bgColor: "bg-blue-50",
                textColor: "text-blue-700",
            },
            {
                title: "Total Applicants",
                value: kpi?.totalApplicants ?? "-",
                icon: Users,
                color: "bg-green-500",
                bgColor: "bg-green-50",
                textColor: "text-green-700",
            },
            {
                title: "Applicants (30d)",
                value: kpi?.applicantsLast30Days ?? "-",
                icon: FileText,
                color: "bg-purple-500",
                bgColor: "bg-purple-50",
                textColor: "text-purple-700",
            },
        ],
        [kpi]
    );

    // Tính toán dữ liệu cho biểu đồ cột
    const chartData = useMemo(() => {
        if (!trend || trend.length === 0) return [];

        const maxValue = Math.max(...trend.map((p) => p.count));
        const base = yMeta.niceMax;

        const getHeight = (count) => {
            if (!base) return 0;
            const ratio = count / base;
            const minH = count > 0 ? 0.15 : 0; // tối thiểu 15% nếu có dữ liệu
            let h = Math.max(ratio * 100, minH);
            if (count === maxValue) h = Math.min(h + 10, 95); // nhấn nhẹ peak
            return h;
        };

        return trend.map((point, index) => ({
            ...point,
            height: getHeight(point.count),
            isToday: index === trend.length - 1,
            isWeekend: [0, 6].includes(new Date(point.date).getDay()),
            isPeak: point.count === maxValue,
        }));
    }, [trend, yMeta.niceMax]);

    // THÊM: màu cổ điển cho bar
    const barClass = (p) =>
        [
            "w-full rounded-t-sm transition-all duration-300 hover:opacity-90 shadow-sm",
            p.isWeekend ? "bg-gray-400" : "bg-blue-500", // weekdays/xám cho weekend
            p.isPeak && "bg-blue-700", // peak đậm hơn
            p.isToday && "ring-2 ring-blue-600", // today: viền xanh, giữ màu như weekdays
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <CompanyGuard>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-blue-700">
                        Recruiter Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Overview of your hiring activities
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, idx) => (
                        <Card
                            key={idx}
                            className="transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-lg hover:scale-105"
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <div
                                    className={`p-3 rounded-full text-white ${stat.color} shadow-lg`}
                                >
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className={`text-3xl font-bold ${stat.textColor}`}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    className={`text-xs mt-1 ${stat.textColor} opacity-70`}
                                >
                                    {stat.title === "Active Jobs" &&
                                        "Currently posted"}
                                    {stat.title === "Total Applicants" &&
                                        "All time"}
                                    {stat.title === "Applicants (30d)" &&
                                        "Last 30 days"}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Enhanced Charts */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Applications Trend Chart */}
                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                    Applications Trend (30 days)
                                </CardTitle>
                                <div className="text-sm text-gray-500">
                                    {trend.length > 0 &&
                                        `${trend.reduce(
                                            (sum, p) => sum + p.count,
                                            0
                                        )} total applications`}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] relative">
                                {/* Y-axis labels (nice ticks) */}
                                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2">
                                    {yMeta.ticks
                                        .slice()
                                        .reverse()
                                        .map((v) => (
                                            <div
                                                key={v}
                                                className="text-right font-medium"
                                            >
                                                {v}
                                            </div>
                                        ))}
                                </div>

                                {/* Chart area */}
                                <div className="ml-8 h-full flex items-end justify-between gap-1">
                                    {chartData.map((point, i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center flex-1 group relative h-full" // <-- thêm h-full ở đây
                                        >
                                            {/* Wrapper đảm bảo % height dựa vào 300px */}
                                            <div className="w-full h-full flex items-end">
                                                <div
                                                    className={barClass(point)}
                                                    style={{
                                                        height: `${Math.max(
                                                            point.height,
                                                            point.count > 0
                                                                ? 15
                                                                : 0
                                                        )}%`,
                                                        minHeight:
                                                            point.count > 0
                                                                ? "20px"
                                                                : "0px",
                                                    }}
                                                    title={`${point.date}: ${point.count} applications`}
                                                >
                                                    <div className="w-full h-full rounded-t-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
                                                </div>
                                            </div>

                                            {/* Tooltip */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                                                <div className="font-semibold">
                                                    {point.count}
                                                </div>
                                                <div className="text-xs opacity-75">
                                                    applications
                                                </div>
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                            </div>

                                            {/* Date label */}
                                            <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left whitespace-nowrap">
                                                {new Date(
                                                    point.date
                                                ).toLocaleDateString("vi-VN", {
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Legend với màu sắc cổ điển */}
                                <div className="flex items-center gap-6 mt-6 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-lg shadow-sm"></div>
                                        <span className="font-medium">
                                            Weekdays
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-400 rounded-lg shadow-sm"></div>
                                        <span className="font-medium">
                                            Weekends
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-700 rounded-lg shadow-sm"></div>
                                        <span className="font-medium">
                                            Peak Day
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-lg shadow-sm"></div>
                                        <span className="font-medium">
                                            Today
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity & Insights */}
                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-green-600" />
                                Recent Activity & Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Activity Items */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <Users className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-blue-900">
                                            New Applications
                                        </p>
                                        <p className="text-xs text-blue-700">
                                            Check the Applicants page to review
                                            new applications
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <Briefcase className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-green-900">
                                            Job Posting
                                        </p>
                                        <p className="text-xs text-green-700">
                                            Create new job postings to attract
                                            more candidates
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                    <div className="p-2 bg-purple-100 rounded-full">
                                        <Eye className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-purple-900">
                                            Analytics
                                        </p>
                                        <p className="text-xs text-purple-700">
                                            View detailed analytics in the
                                            Analytics page
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="pt-4 border-t border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                    Quick Stats
                                </h4>
                                <div className="grid grid-cols-2 gap-3 text-center">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="text-lg font-bold text-gray-800">
                                            {trend.length > 0
                                                ? Math.round(
                                                      trend.reduce(
                                                          (sum, p) =>
                                                              sum + p.count,
                                                          0
                                                      ) / trend.length
                                                  )
                                                : 0}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Avg daily
                                        </div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="text-lg font-bold text-gray-800">
                                            {trend.length > 0
                                                ? Math.max(
                                                      ...trend.map(
                                                          (p) => p.count
                                                      )
                                                  )
                                                : 0}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Peak day
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CompanyGuard>
    );
};

export default RecruiterDashboard;

