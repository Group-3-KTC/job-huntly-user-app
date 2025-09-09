"use client";
import Link from "next/link";

export default function CompanyCard({ avatar, companyName, companyId }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={avatar} alt="Company Logo" className="w-20 h-20 rounded-full object-contain border" />
      {companyId ? (
        <Link href={`/company/company-detail/${companyId}`} className="hover:underline hover:text-blue-600 transition">
          {companyName}
        </Link>
      ) : (
        <div className="text-gray-800">{companyName}</div>
      )}
    </div>
  );
}