"use client";

import React from "react";
import { useSelector } from "react-redux";
import AppInitializer from "@/components/AppInitializer";
import ToastProvider from "@/components/ui/toast";
import { selectAuthHydrated } from "@/features/auth/authSlice";
import { Suspense } from "react";
import { usePathname } from "next/navigation"; // Thêm để check route
import ClientLayout from "@/layout/ClientLayout";


export default function PageWrapper({ children }) {
    const isAuthHydrated = useSelector(selectAuthHydrated);
    const pathname = usePathname(); 

    console.log("PageWrapper state at", new Date().toISOString(), { isAuthHydrated });

    
    const isRecruiterRoute = pathname.startsWith("/recruiter");

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
                    <ToastProvider />
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