import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">JobHuntly</h3>
                        <p className="text-gray-400 mb-4">
                            Call now:{" "}
                            <span className="text-white">(012) 345-6789</span>
                        </p>
                        <p className="text-gray-400 text-sm">
                            475A Điện Biên Phủ, Phường 25, Bình Thạnh, Hồ Chí
                            Minh, Việt Nam
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Link</h4>
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
                        <h4 className="font-semibold mb-4">Candidate</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Browse Companies
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Candidate Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Saved Jobs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Recruiter */}
                    <div>
                        <h4 className="font-semibold mb-4">Recruiter</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Post a Job
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Browse Candidates
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Recruiter Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Applications
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 JobHuntly. All rights Reserved
                    </p>

                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white"
                        >
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white"
                        >
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white"
                        >
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-400 hover:text-white"
                        >
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
