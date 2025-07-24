"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import CandidateLoginForm from "@/components/auth/CandidateLoginForm";
import RecruiterLoginForm from "@/components/auth/RecruiterLoginForm";

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState("candidate");

    return (
        <div className="min-h-screen ">
            <main className="container mx-auto py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Login Form */}
                    <div className="w-full lg:w-1/2">
                        <Card className="shadow-md">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-semibold">
                                    Đăng nhập
                                </CardTitle>
                                <p className="text-gray-600">
                                    Liên kết tài khoản của bạn để tiếp tục sử
                                    dụng dịch vụ của Job Huntly
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
                                            Ứng viên
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="recruiter"
                                            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500"
                                        >
                                            Nhà tuyển dụng
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="candidate">
                                        <CandidateLoginForm role={activeTab} />
                                    </TabsContent>

                                    <TabsContent value="recruiter">
                                        <RecruiterLoginForm role={activeTab} />
                                    </TabsContent>
                                </Tabs>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        Chưa có tài khoản?{" "}
                                        <Link
                                            href="/register"
                                            className="text-orange-500 hover:underline font-medium"
                                        >
                                            Đăng ký ngay
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
                                        <h3 className="text-lg font-semibold mb-4">
                                            Chào mừng bạn đến với{" "}
                                            <strong className="text-blue-600">
                                                Job Huntly
                                            </strong>
                                        </h3>
                                        <div className="flex items-center mb-6">
                                            <Image
                                                src="/placeholder.svg?height=32&width=120&text=Job+Huntly"
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
                                                src="/placeholder.svg?height=160&width=160&text=Developer"
                                                alt="Developer"
                                                width={160}
                                                height={160}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <h4 className="font-semibold mb-2">
                                                Đăng nhập ngay để tận dụng tối
                                                đa các công cụ của Job Huntly và
                                                gia tăng cơ hội tiếp cận việc
                                                làm hot nhất
                                            </h4>
                                            <ul className="mt-4 space-y-2">
                                                {[
                                                    "Tạo CV chuẩn ATS",
                                                    "Ứng tuyển nhanh chóng hơn với hồ sơ đã được lưu",
                                                    "Quản lý hồ sơ ứng tuyển và theo dõi cập nhật trạng thái ứng tuyển",
                                                    "Xem được mức lương cho mỗi vị trí",
                                                    "Lưu lại công việc yêu thích để ứng tuyển sau",
                                                    "Thực hiện bài trắc nghiệm đánh giá tính cách làm việc",
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
                                        <p className="text-sm text-gray-500">
                                            Nếu bạn gặp khó khăn trong việc đăng
                                            nhập / tạo tài khoản, vui lòng liên
                                            hệ với Job Huntly qua email
                                            contact@JobHuntly.vn
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Chào mừng Nhà tuyển dụng đến với{" "}
                                            <strong className="text-blue-600">
                                                Job Huntly
                                            </strong>
                                        </h3>
                                        <div className="flex justify-center mb-8">
                                            <Image
                                                src="/placeholder.svg?height=160&width=160&text=Recruiter"
                                                alt="Recruiter"
                                                width={160}
                                                height={160}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <h4 className="font-semibold mb-2">
                                                Đăng nhập để truy cập các công
                                                cụ tuyển dụng mạnh mẽ
                                            </h4>
                                            <ul className="mt-4 space-y-2">
                                                {[
                                                    "Đăng tin tuyển dụng miễn phí",
                                                    "Tìm kiếm ứng viên phù hợp",
                                                    "Quản lý hồ sơ ứng tuyển",
                                                    "Thống kê hiệu quả tuyển dụng",
                                                    "Hỗ trợ tư vấn tuyển dụng",
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
};

export default LoginPage;
