import React from "react";
import DetailJob from "./detailJob";
import { getJobDetail } from "@/services/jobDetailService";

export default async function JobDetailPage({ params }) {
  try {
    const job = await getJobDetail(params.id);

    return (
      <div className="w-[90%] mx-auto mt-0">
        <DetailJob job={job} />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Không thể tải thông tin công việc.
      </div>
    );
  }
}
