"use client";

import RecruiterJobsList from "@/components/recruiter/RecruiterJobsList";

export default function ManageJobDraftsPage() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Manage Jobs - Drafts</h1>
            <RecruiterJobsList tab="drafts" />
        </div>
    );
} 