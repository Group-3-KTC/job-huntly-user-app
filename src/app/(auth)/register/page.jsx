"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import CandidateRegisterForm from "@/components/auth/CandidateRegisterForm";
import RecruiterRegisterForm from "@/components/auth/RecruiterRegisterForm";
import logoTitle from "@/assets/images/logo-title.png";
import banner from "@/assets/images/login-banner.png";
import recruiterBanner from "@/assets/images/recruiter-banner.jpg";

export default function RegisterPage() {
    const [activeTab, setActiveTab] = useState("CANDIDATE");

    return (
        <div className="min-h-screen">
            <main className="container mx-auto py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Register Form */}
                    <div className="w-full lg:w-1/2">
                        <Card className="shadow-md">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-semibold">
                                    Đăng ký
                                </CardTitle>
                                <p className="text-gray-600">
                                    Tạo tài khoản mới để sử dụng dịch vụ của Job
                                    Huntly
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
                                            value="CANDIDATE"
                                            className="data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
                                        >
                                            Ứng viên
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="RECRUITER"
                                            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500"
                                        >
                                            Nhà tuyển dụng
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="CANDIDATE">
                                        <CandidateRegisterForm
                                            role={activeTab}
                                        />
                                    </TabsContent>

                                    <TabsContent value="RECRUITER">
                                        <RecruiterRegisterForm
                                            role={activeTab}
                                        />
                                    </TabsContent>
                                </Tabs>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        Đã có tài khoản?{" "}
                                        <Link
                                            href="/login"
                                            className="text-orange-500 hover:underline font-medium"
                                        >
                                            Đăng nhập ngay
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
                                {activeTab === "CANDIDATE" ? (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Tham gia{" "}
                                            <strong className="text-blue-600">
                                                Job Huntly
                                            </strong>{" "}
                                            ngay hôm nay
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
                                                | Nền tảng tìm việc hàng đầu
                                            </span>
                                        </div>
                                        <div className="flex justify-center mb-8">
                                            <Image
                                                src={banner}
                                                alt="Join Us"
                                                width={400}
                                                height={300}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <h4 className="font-semibold mb-2">
                                                Đăng ký ngay để khám phá hàng
                                                ngàn cơ hội việc làm hấp dẫn
                                            </h4>
                                            <ul className="mt-4 space-y-2">
                                                {[
                                                    "Miễn phí tạo CV chuyên nghiệp",
                                                    "Tiếp cận hàng ngàn việc làm hot",
                                                    "Nhận thông báo việc làm phù hợp",
                                                    "Kết nối với các nhà tuyển dụng hàng đầu",
                                                    "Tham gia cộng đồng IT Việt Nam",
                                                    "Nhận tư vấn nghề nghiệp miễn phí",
                                                ].map((benefit, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start"
                                                    >
                                                        <div className="text-orange-500 mr-2">
                                                            •
                                                        </div>
                                                        <span>{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">
                                            Đăng ký Tài khoản Nhà tuyển dụng
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Tạo ngay tài khoản để tuyển dụng các
                                            Lập Trình Viên Hàng Đầu trên Job
                                            Huntly
                                        </p>
                                        <div className="flex items-center mb-6">
                                            <Image
                                                src={logoTitle}
                                                alt="Job Huntly"
                                                width={120}
                                                height={32}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-600">
                                                | Nền tảng tìm việc hàng đầu
                                            </span>
                                        </div>
                                        <div className="flex justify-center mb-8">
                                            <Image
                                                src={recruiterBanner}
                                                alt="Recruit"
                                                width={400}
                                                height={300}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <h4 className="font-semibold mb-2">
                                                Tại sao chọn Job Huntly cho
                                                tuyển dụng?
                                            </h4>
                                            <ul className="mt-4 space-y-2">
                                                {[
                                                    "Cơ sở dữ liệu ứng viên IT lớn nhất",
                                                    "Công cụ tìm kiếm ứng viên thông minh",
                                                    "Hỗ trợ đăng tin tuyển dụng miễn phí",
                                                    "Quản lý quy trình tuyển dụng hiệu quả",
                                                    "Tư vấn chiến lược tuyển dụng",
                                                ].map((benefit, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start"
                                                    >
                                                        <div className="text-orange-500 mr-2">
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
}
