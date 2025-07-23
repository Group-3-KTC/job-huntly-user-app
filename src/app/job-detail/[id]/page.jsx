import React from "react";
import DetailJob from "./detailJob";

const getJobDetail = async (id) => {
  const res = await fetch(
    `https://687076977ca4d06b34b6dc20.mockapi.io/api/v1/jobs/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch job detail");
  return res.json();
};

export default async function JobDetailPage({ params }) {
  const job = await getJobDetail(params.id);

  return (
    <div className="w-[90%] mx-auto mt-0">
      <DetailJob job={job} />
    </div>
  );
}
