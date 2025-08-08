"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText, LayoutTemplate, Send, Heart, Paperclip } from "lucide-react";

export default function CandidateDashboard() {
    return (
        <div className="flex flex-col gap-6">
            {/* Profile Section */}
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
                <Image
                    src="/images/avatar-sample.jpg"
                    alt="Avatar"
                    width={64}
                    height={64}
                    className="object-cover rounded-full"
                />
                <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900">
                        Hoang Phuc Vo
                    </h2>
                    <p className="text-sm text-gray-600">hehe</p>
                    <p className="text-sm text-gray-600">
                        phuc111239@gmail.com
                    </p>
                    <Link
                        href="/profile"
                        className="inline-block mt-1 text-sm text-color-primary-main"
                    >
                        Update your profile &gt;
                    </Link>
                </div>
            </div>

            {/* CV Section */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-2 text-base font-semibold text-gray-800">
                    Your Attached CV
                </h3>
                <div className="flex items-center gap-3 p-4 bg-gray-100 border border-gray-200 rounded-lg">
                    <div className="p-2 bg-orange-100 rounded-full text-color-primary-accent">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <a
                            href="profile"
                            className="text-sm font-semibold text-gray-900 hover:underline"
                        >
                            CV Võ Hoàng Phúc - Intern FrontEnd 2.pdf
                        </a>
                        <p className="text-xs text-gray-500">
                            Last uploaded: 23/07/2025
                        </p>
                    </div>
                    <Link
                        href="profile/applications"
                        className="text-sm text-color-primary-main whitespace-nowrap"
                    >
                        Manage CV attachment &gt;
                    </Link>
                </div>
            </div>

            {/* ITviec Profile Completion */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-gray-800">
                    Complete your profile
                </h3>
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                    {/* Circle Progress */}
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full">
                            <circle
                                cx="48"
                                cy="48"
                                r="38"
                                fill="none"
                                stroke="#f3f4f6"
                                strokeWidth="8"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="38"
                                fill="none"
                                stroke="#e67600"
                                strokeWidth="8"
                                strokeDasharray="238"
                                strokeDashoffset="88"
                                transform="rotate(-90 48 48)"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-800">
                                63%
                            </span>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                        <p className="mb-1 text-sm text-gray-700">
                            Reach{" "}
                            <span className="font-bold text-color-primary-accent">
                                70%
                            </span>{" "}
                            of your profile to start generating your IT
                            professional CV.
                        </p>
                        <Link
                            href="/profile"
                            className="text-sm text-color-primary-main"
                        >
                            Complete your profile &gt;
                        </Link>
                    </div>
                </div>
            </div>

            {/* Activity Stats */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-gray-800">
                    Your Activities
                </h3>
                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                    <div className="flex flex-col items-center p-4 text-blue-600 bg-blue-100 rounded">
                        <Send className="w-6 h-6 mb-1" />
                        <p className="text-sm">Applied Jobs</p>
                        <p className="text-2xl font-bold">0</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-orange-100 rounded text-color-primary-accent">
                        <Heart className="w-6 h-6 mb-1" />
                        <p className="text-sm">Saved Jobs</p>
                        <p className="text-2xl font-bold">0</p>
                    </div>
                    <div className="flex flex-col items-center p-4 text-green-600 bg-green-100 rounded">
                        <Paperclip className="w-6 h-6 mb-1" />
                        <p className="text-sm">Job Invitations</p>
                        <p className="text-2xl font-bold">0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
