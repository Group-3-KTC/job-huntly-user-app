"use client";

export default function LoadingScreen({ message = "Loading ..." }) {
    return (
        <div className="min-h-[290px] flex items-center justify-center">
            <div className="p-10 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="mx-auto border-2 border-blue-500 rounded-full loader"></div>
                <p className="mt-2 text-gray-500">{message}</p>
            </div>
        </div>
    );
}
