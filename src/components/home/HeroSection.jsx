import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import illustration from "@/assets/images/home-illustration.png";
import { MapPin, Search } from "lucide-react";
import Image from "next/image";
import ProvinceCombobox from "@/components/home/ProvinceCombobox";

const HeroSection = () => {
    return (
        <section className="py-16 lg:py-24">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center gap-12 lg:flex-row">
                    <div className="flex-1 max-w-2xl">
                        <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                            Find a job that suits your interest & skills.
                        </h1>
                        <p className="mb-8 text-lg text-gray-600">
                            Aliquam vitae turpis in diam convallis finibus in at
                            risus. Nullam in scelerisque leo, eget sollicitudin
                            velit bestibulum.
                        </p>

                        {/* Search Form */}
                        <div className="flex flex-col gap-2 p-2 mb-6 bg-white rounded-lg shadow-lg sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                <Input
                                    placeholder="Job title, Keyword..."
                                    className="pl-10 border-0 focus-visible:ring-0"
                                />
                            </div>
                            <div className="relative flex-1">
                                <MapPin className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                <div className="pl-10">
                                    <ProvinceCombobox />
                                </div>
                                {/*<Input*/}
                                {/*  placeholder="Your Location"*/}
                                {/*  className="pl-10 border-0 focus-visible:ring-0"*/}
                                {/*/>*/}
                            </div>
                            <Button className="px-8 bg-blue-600 hover:bg-blue-700">
                                Find Job
                            </Button>
                        </div>

                        {/* Suggestions */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-gray-600">Suggestion:</span>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Designer,
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Programming,
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-blue-700"
                            >
                                Digital Marketing,
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Video,
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Animation
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 max-w-lg">
                        <div className="relative">
                            <Image
                                src={illustration}
                                alt="Job Search Illustration"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
