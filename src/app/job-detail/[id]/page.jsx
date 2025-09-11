
export const dynamic = "force-dynamic";
import React from "react";
import DetailJob from "./detailJob";
import { getJobDetail } from "@/services/jobDetailService";

export default async function JobDetailPage({ params }) {
    const resolvedParams = await params;
    if (!resolvedParams || !resolvedParams.id) {
        return (
            <div className="mt-10 text-center text-red-500">
                Không tìm thấy ID công việc.
            </div>
        );
    }

    const { id } = resolvedParams;

    try {
        const job = await getJobDetail(id);

        return (
            <div className="w-[90%] mx-auto mt-0">
                <DetailJob job={job} />
            </div>
        );
    } catch (error) {
        return (
            <div className="mt-10 text-center text-red-500">
                Không thể tải thông tin công việc.
            </div>
        );
    }
}
