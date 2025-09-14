"use client";

import RecruiterJobsList from "@/components/recruiter/RecruiterJobsList";

export default function ManageJobActivePage() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Manage Jobs - Active</h1>
            <RecruiterJobsList tab="active" />
        </div>
    );
} 