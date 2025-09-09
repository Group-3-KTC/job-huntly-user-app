"use client";

import React, {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import CandidateLoginForm from "@/components/auth/CandidateLoginForm";
import RecruiterLoginForm from "@/components/auth/RecruiterLoginForm";
import logoTitle from "@/assets/images/logo-title.png";
import banner from "@/assets/images/login-banner.png";
import recruiterBanner from "@/assets/images/recruiter-banner.jpg";

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState("candidate");

    return (
        <div className="min-h-screen ">
            <main className="container px-8 py-8 mx-auto">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Login Form */}
                    <div className="w-full lg:w-1/2">
                        <Card className="shadow-md">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-semibold">
                                    Log In
                                </CardTitle>
                                <p className="text-gray-600">
                                    Link your account to continue using Job Huntly's services.
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Tabs
                                    value={activeTab}
                                    onValueChange={setActiveTab}
                                    className="w-full"
                                >
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger
                                            value="candidate"
                                            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500"
                                        >
                                            Candidate
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="recruiter"
                                            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500"
                                        >
                                            Recruiter
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="candidate">
                                        <CandidateLoginForm role={activeTab}/>
                                    </TabsContent>

                                    <TabsContent value="recruiter">
                                        <RecruiterLoginForm role={activeTab}/>
                                    </TabsContent>
                                </Tabs>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account yet?{" "}
                                        <Link
                                            href="/register"
                                            className="font-medium text-orange-500 hover:underline"
                                        >
                                            Sign Up Now
                                        </Link>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side Content */}
                    <div className="w-full lg:w-1/2">
                        <Card className="shadow-md">
                            <CardContent className="p-6">
                                {activeTab === "candidate" ? (
                                    <div>
                                        <h3 className="mb-4 text-lg font-semibold">
                                            Welcome to{" "}
                                            <strong className="text-blue-600">
                                                Job Huntly
                                            </strong>
                                        </h3>
                                        <div className="flex items-center mb-6">
                                            <Image
                                                src={logoTitle}
                                                alt="Job Huntly"
                                                width={120}
                                                height={32}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-600">
                                                | The leading job search platform
                                            </span>
                                        </div>
                                        <div className="flex justify-center mb-8">
                                            <Image
                                                src={banner}
                                                alt="Developer"
                                                width={400}
                                                height={300}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <h4 className="mb-2 font-semibold">
                                                Log in now to get the most out of Job Huntly's tools and increase your
                                                chances of finding the hottest jobs.
                                            </h4>
                                            <ul className="mt-4 space-y-2">
                                                {[
                                                    "Create an ATS-friendly CV",
                                                    "Apply faster with a saved profile",
                                                    "Manage applications and track application status updates",
                                                    "See salary ranges for each position",
                                                    "Save favorite jobs to apply later"
                                                ].map((benefit, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start"
                                                    >
                                                        <div className="mr-2 text-orange-500">
                                                            •
                                                        </div>
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            If you have trouble logging in or creating an account, please contact Job
                                            Huntly via email at support@jobhuntly.vn
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="mb-4 text-lg font-semibold">
                                            Welcome to{" "}
                                            <strong className="text-blue-600">
                                                Job Huntly
                                            </strong>
                                        </h3>
                                        <div className="flex items-center mb-6">
                                            <Image
                                                src={logoTitle}
                                                alt="Job Huntly"
                                                width={120}
                                                height={32}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-600">
                                                | Recruiting Made Simple.
                                            </span>
                                        </div>
                                        <div className="flex justify-center mb-8">
                                            <Image
                                                src={recruiterBanner}
                                                alt="Recruiter"
                                                width={400}
                                                height={300}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <h4 className="mb-2 font-semibold">
                                                Log in to access powerful recruiting tools
                                            </h4>
                                            <ul className="mt-4 space-y-2">
                                                {[
                                                    "Post job ads for free",
                                                    "Find suitable candidates",
                                                    "Manage application profiles"
                                                ].map((benefit, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start"
                                                    >
                                                        <div className="mr-2 text-orange-500">
                                                            •
                                                        </div>
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
