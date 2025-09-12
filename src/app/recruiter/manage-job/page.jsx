"use client";

import RecruiterJobsList from "@/components/recruiter/RecruiterJobsList";

export default function ManageJobIndexPage() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Manage Jobs - All</h1>
            <RecruiterJobsList tab="all" />
        </div>
    );
} 