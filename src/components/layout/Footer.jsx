import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Footer = () => {
    const role = useSelector((state) => state.auth.user?.role);

    const handleRecruiterClick = (e) => {
        if (role === "CANDIDATE") {
            e.preventDefault();
            toast.error("You are not recruiter");
        }
    };

    return (
        <footer className="py-12 text-white bg-gray-900">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <h3 className="mb-4 text-xl font-bold">JobHuntly</h3>
                        <p className="mb-4 text-gray-400">
                            Call now:{" "}
                            <span className="text-white">(012) 345-6789</span>
                        </p>
                        <p className="text-sm text-gray-400">
                            475A Điện Biên Phủ, Phường 25, Bình Thạnh, Hồ Chí
                            Minh, Việt Nam
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4 font-semibold">Quick Link</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Candidate */}
                    <div>
                        <h4 className="mb-4 font-semibold">Candidate</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link
                                    href="/company/company-search"
                                    className="hover:text-white"
                                >
                                    Browse Companies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/search"
                                    className="hover:text-white"
                                >
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="hover:text-white"
                                >
                                    Candidate Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs" className="hover:text-white">
                                    Saved Jobs
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Recruiter */}
                    <div>
                        <h4 className="mb-4 font-semibold">Recruiter</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link
                                    href="/recruiter/create-job"
                                    className="hover:text-white"
                                    onClick={handleRecruiterClick}
                                >
                                    Post a Job
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/recruiter/dashboard"
                                    className="hover:text-white"
                                    onClick={handleRecruiterClick}
                                >
                                    Recruiter Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/recruiter/applicants/all"
                                    className="hover:text-white"
                                    onClick={handleRecruiterClick}
                                >
                                    Applications
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/recruiter/company"
                                    className="hover:text-white"
                                    onClick={handleRecruiterClick}
                                >
                                    Company Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-800 md:flex-row">
                    <p className="text-sm text-gray-400">
                        © 2025 JobHuntly. All rights Reserved
                    </p>

                    <div className="flex mt-4 space-x-4 md:mt-0">
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white"
                        >
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white"
                        >
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white"
                        >
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
