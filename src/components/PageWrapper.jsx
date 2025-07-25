import React from "react";
import { useSelector } from "react-redux";
import AppInitializer from "@/components/AppInitializer";
import ToastProvider from "@/components/ui/toast";
import ClientLayout from "@/layout/ClientLayout";
import { selectAuthHydrated } from "@/features/auth/authSlice";

const PageWrapper = ({ children }) => {
    const isAuthHydrated = useSelector(selectAuthHydrated);

    return (
        <>
            <AppInitializer />
            {!isAuthHydrated ? (
                <div className="h-screen flex items-center justify-center bg-gray-50">
                    <div className="rounded-lg shadow-sm border border-gray-200 p-20 text-center">
                        <div className="mx-auto loader border-2 border-blue-500 rounded-full"></div>
                        <p className="mt-2 text-gray-500">Loading...</p>
                    </div>
                </div>
            ) : (
                <>
                    <ToastProvider />
                    <ClientLayout>{children}</ClientLayout>
                </>
            )}
        </>
    );
};

export default PageWrapper;
