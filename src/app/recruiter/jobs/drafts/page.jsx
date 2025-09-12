"use client";

import RecruiterJobsList from "@/components/recruiter/RecruiterJobsList";

export default function DraftJobsPage() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Draft Jobs</h1>
            <RecruiterJobsList tab="drafts" />
        </div>
    );
} 