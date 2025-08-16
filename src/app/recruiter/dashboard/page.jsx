"use client";

import React from "react";
import { Briefcase, Users, FileText, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecruiterDashboard = () => {
    const stats = [
        {
            title: "Active Jobs",
            value: "12",
            icon: Briefcase,
            color: "bg-blue-500",
        },
        {
            title: "Total Applicants",
            value: "254",
            icon: Users,
            color: "bg-blue-400",
        },
        {
            title: "Interviews Scheduled",
            value: "37",
            icon: FileText,
            color: "bg-blue-300",
        },
        {
            title: "Unread Notifications",
            value: "5",
            icon: Bell,
            color: "bg-blue-200",
        },
    ];

    return (
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => (
                    <Card
                        key={idx}
                        className="transition-shadow border border-gray-200 shadow-sm hover:shadow-md"
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div
                                className={`p-2 rounded-full text-white ${stat.color}`}
                            >
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stat.value}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Chart & Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Chart Placeholder */}
                <Card className="h-[300px] flex items-center justify-center border border-gray-200">
                    <span className="text-gray-400">[Chart Placeholder]</span>
                </Card>

                {/* Recent Activity */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 text-sm">
                            <li>
                                📌 John Doe applied for{" "}
                                <b>Frontend Developer</b>
                            </li>
                            <li>
                                📌 Jane Smith scheduled interview for{" "}
                                <b>UI/UX Designer</b>
                            </li>
                            <li>
                                📌 You posted a new job: <b>Backend Engineer</b>
                            </li>
                            <li>📌 Alex Johnson was shortlisted</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RecruiterDashboard;
