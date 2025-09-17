"use client";
import Link from "next/link";

export default function CompanyCard({ avatar, companyName, companyId }) {
    const imageSrc =
        typeof avatar === "string" && avatar.trim() !== "" ? avatar : undefined;
    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-3 text-center bg-white shadow-lg rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt="Company Logo"
                    className="w-20 h-20 border rounded-full object-cover"
                    loading="lazy"
                />
            ) : (
                <div className="w-20 h-20 border rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    No Logo
                </div>
            )}
            {companyId ? (
                <Link
                    href={`/company/company-detail/${companyId}`}
                    className="transition hover:underline hover:text-blue-600"
                >
                    {companyName}
                </Link>
            ) : (
                <div className="text-gray-800">{companyName}</div>
            )}
        </div>
    );
}
