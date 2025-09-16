"use client";

import React, {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {ArrowRight, MapPin} from "lucide-react";
import {Button} from "@/components/ui/button";

const NEXT_PUBLIC_API_PROXY_TARGET = process.env.NEXT_PUBLIC_API_PROXY_TARGET;
const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_BASE = NEXT_PUBLIC_API_PROXY_TARGET + NEXT_PUBLIC_API_BASE_URL;

async function fetchCompanies(signal) {
    const url = `${API_BASE}/companies?page=0&size=12`;
    const res = await fetch(url, {signal, credentials: "include"});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

function normalizeCompany(c) {
    return {
        id: c.id,
        name: c.companyName || "Unknown Company",
        logo: c.avatar || "/logo-placeholder.png",
        location: `${c.locationCity || ""}, ${c.locationCountry || ""}`,
        openPositions: c.jobsCount || 0,
        pro: !!c.isProCompany,
    };
}

function sortWithPro(companies) {
    return [...companies].sort((a, b) => {
        if (a.pro !== b.pro) return a.pro ? -1 : 1;
        return b.openPositions - a.openPositions;
    });
}

const TopCompaniesSection = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                setLoading(true);
                const data = await fetchCompanies(controller.signal);
                const items = Array.isArray(data?.content) ? data.content : [];
                const normalized = items.map(normalizeCompany);
                const finalList = sortWithPro(normalized);
                setCompanies(finalList);
            } catch (e) {
                if (e.name !== "AbortError") setErr(e.message || "Failed to load");
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, []);

    const body = useMemo(() => {
        if (loading) {
            return (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({length: 6}).map((_, i) => (
                        <div key={i} className="p-6 bg-white border border-gray-200 rounded-lg animate-pulse">
                            <div className="flex items-start mb-4">
                                <div className="w-12 h-12 mr-3 bg-gray-200 rounded-lg"/>
                                <div>
                                    <div className="w-32 h-4 mb-2 bg-gray-200 rounded"/>
                                    <div className="w-20 h-3 bg-gray-200 rounded"/>
                                </div>
                            </div>
                            <div className="w-24 h-4 mb-4 bg-gray-200 rounded"/>
                            <div className="w-full h-8 bg-gray-200 rounded"/>
                        </div>
                    ))}
                </div>
            );
        }

        if (err) {
            return (
                <div className="p-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
                    Failed to load company list. {err}
                </div>
            );
        }

        if (companies.length === 0) {
            return (
                <div className="p-6 text-sm text-gray-600 bg-white border border-gray-200 rounded">
                    No companies are currently available.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {companies.map((company) => {
                    const href = `/company/company-detail/${company.id}`;
                    return (
                        <div
                            key={company.id}
                            className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between mb-4">
                                {/* Logo + Tên công ty đều click được */}
                                <Link href={href} className="group flex items-center">
                                    <div
                                        className="flex items-center justify-center w-12 h-12 mr-3 overflow-hidden bg-white border rounded-lg">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 group-hover:underline">
                                            {company.name}
                                        </h3>
                                        {company.pro && (
                                            <div
                                                className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded inline-block mt-1">
                                                PRO Company
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>

                            <div className="flex items-center mb-4 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1"/>
                                {company.location}
                            </div>

                            {/* Nút cũng điều hướng tới trang company */}
                            <Link href={href} className="w-full">
                                <Button className="w-full text-blue-600 bg-blue-50 hover:bg-blue-100">
                                    Open Positions ({company.openPositions})
                                </Button>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    }, [companies, loading, err]);

    return (
        <section className="py-16">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Top companies</h2>
                    <Link
                        href="/company/company-search/results"
                        className="flex items-center font-medium text-blue-600 hover:text-blue-700"
                    >
                        View All <ArrowRight className="w-4 h-4 ml-2"/>
                    </Link>
                </div>
                {body}
            </div>
        </section>
    );
};

export default TopCompaniesSection;
