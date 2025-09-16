"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function ApplicantsTable({
    data,
    loading,
    onSeeApplication,
    onDetails,
    jobNameMap,
    page,
    totalPages,
    onPageChange,
}) {
    return (
        <div className="bg-white rounded-xl border">
            <div className="px-4 py-3 border-b flex items-center justify-between">
                <h3 className="font-semibold text-lg">
                    Total Applicants : {data?.totalElements ?? 0}
                </h3>
                <div className="flex items-center gap-2">
                    <input
                        className="px-3 py-2 border rounded-md w-64"
                        placeholder="Search Applicants"
                    />
                    <Button variant="outline" size="sm">Filter</Button>
                    <Button variant="secondary" size="sm">Pipeline View</Button>
                    <Button variant="default" size="sm">Table View</Button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-6 py-4 w-12 align-middle">
                                <input type="checkbox" />
                            </th>
                            <th className="text-left px-6 py-4 align-middle">Full Name</th>
                            <th className="text-left px-6 py-4 align-middle">Hiring Stage</th>
                            <th className="text-left px-6 py-4 align-middle">
                                Applied Date
                            </th>
                            <th className="text-left px-6 py-4 align-middle">Job Name</th>
                            <th className="text-left px-6 py-4 align-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-6 text-center text-gray-500 align-middle"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            (data?.content || []).map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 align-middle">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`https://i.pravatar.cc/40?u=${item.userId}`}
                                                className="w-8 h-8 rounded-full"
                                                alt="avatar"
                                            />
                                            <div className="font-medium">
                                                {item.candidateName ||
                                                    item.email ||
                                                    "Unknown"}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <span className="px-2.5 py-1 rounded-full text-xs border text-emerald-700 border-emerald-300 bg-emerald-50">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-middle whitespace-nowrap">
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        {jobNameMap?.[item.jobId] ?? "—"}
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onSeeApplication?.(item)}
                                            >
                                                See Application
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => onDetails?.(item)}
                                            >
                                                Details
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        {!loading && (data?.content?.length ?? 0) === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-6 text-center text-gray-500 align-middle"
                                >
                                    Không có ứng viên
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="px-4 py-3 border-t flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    View <span className="font-medium">{data?.size ?? 10}</span>{" "}
                    Applicants per page
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 0}
                        onClick={() => onPageChange?.(page - 1)}
                    >
                        {"<"}
                    </Button>
                    <div className="w-9 h-9 rounded-md bg-blue-600 text-white flex items-center justify-center">
                        {(page ?? 0) + 1}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page + 1 >= (totalPages ?? 1)}
                        onClick={() => onPageChange?.(page + 1)}
                    >
                        {">"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
