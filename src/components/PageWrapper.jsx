"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AppInitializer from "@/components/AppInitializer";
import { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation"; // Thêm để check route
import ClientLayout from "@/layout/ClientLayout";
import {
    selectAuthHydrated,
    selectAuthRole,
} from "@/features/auth/authSelectors";

export default function PageWrapper({ children }) {
    const isAuthHydrated = useSelector(selectAuthHydrated);
    const role = useSelector(selectAuthRole);
    const pathname = usePathname();
    const router = useRouter();

    const isRecruiterRoute = pathname?.startsWith("/recruiter");

    // tạm thời ko render để tránh nháy header candidate khi log = recruiter
    useEffect(() => {
        if (isAuthHydrated && role === "RECRUITER" && pathname === "/") {
            router.replace("/recruiter/dashboard");
        }
    }, [isAuthHydrated, role, pathname, router]);

    if (isAuthHydrated && role === "RECRUITER" && pathname === "/") {
        return null;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AppInitializer />
            {!isAuthHydrated ? (
                <div className="flex items-center justify-center h-screen bg-gray-50">
                    <div className="p-20 text-center border border-gray-200 rounded-lg shadow-sm">
                        <div className="mx-auto border-2 border-blue-500 rounded-full loader"></div>
                        <p className="mt-2 text-gray-500">Loading...</p>
                    </div>
                </div>
            ) : (
                <>
                    {isRecruiterRoute ? (
                        children
                    ) : (
                        <ClientLayout>{children}</ClientLayout>
                    )}
                </>
            )}
        </Suspense>
    );
}
