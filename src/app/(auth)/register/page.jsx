"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("candidate");

  return (
    <div className="min-h-screen bg-orange-50">
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
                  Tạo tài khoản mới để sử dụng dịch vụ của Job Huntly
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
                      value="employer"
                      className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-500"
                    >
                      Nhà tuyển dụng
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="candidate" className="space-y-4">
                    {/* Social Register Buttons */}
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 bg-transparent"
                      >
                        <Image
                          src="/placeholder.svg?height=24&width=24&text=G"
                          alt="Google"
                          width={24}
                          height={24}
                        />
                        Đăng ký với Google
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-700"
                      >
                        <Image
                          src="/placeholder.svg?height=24&width=24&text=GH"
                          alt="GitHub"
                          width={24}
                          height={24}
                        />
                        Đăng ký với GitHub
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">
                          Hoặc
                        </span>
                      </div>
                    </div>

                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="fullname">Họ và tên</Label>
                        <Input
                          id="fullname"
                          type="text"
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Nhập email"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>

                      <div>
                        <Label htmlFor="password">Mật khẩu</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">
                          Xác nhận mật khẩu
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Vui lòng xác nhận mật khẩu"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          Tôi đã đọc và chấp nhận{" "}
                          <Link
                            href="#"
                            className="text-blue-500 hover:underline"
                          >
                            Điều Khoản Sử Dụng
                          </Link>{" "}
                          và{" "}
                          <Link
                            href="#"
                            className="text-blue-500 hover:underline"
                          >
                            Chính Sách Bảo Mật
                          </Link>{" "}
                          của Job Huntly
                        </Label>
                      </div>

                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Đăng Ký
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="employer" className="space-y-4">
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="employer-fullname">Họ và tên</Label>
                        <Input
                          id="employer-fullname"
                          type="text"
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      <div>
                        <Label htmlFor="employer-email">Email</Label>
                        <Input
                          id="employer-email"
                          type="email"
                          placeholder="Nhập email"
                        />
                      </div>

                      <div>
                        <Label htmlFor="employer-phone">Số điện thoại</Label>
                        <Input
                          id="employer-phone"
                          type="tel"
                          placeholder="Nhập số điện thoại liên hệ"
                        />
                      </div>

                      <div>
                        <Label htmlFor="employer-password">Mật khẩu</Label>
                        <div className="relative">
                          <Input
                            id="employer-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="employer-confirmPassword">
                          Xác nhận mật khẩu
                        </Label>
                        <div className="relative">
                          <Input
                            id="employer-confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Vui lòng xác nhận mật khẩu"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="text-orange-500 font-medium mb-4">
                          Thông Tin Công Ty
                        </h4>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="taxCode">Mã số thuế</Label>
                            <Input
                              id="taxCode"
                              type="text"
                              placeholder="Nhập mã số thuế"
                            />
                          </div>

                          <div>
                            <Label htmlFor="companyName">
                              Tên công ty đăng ký kinh doanh
                            </Label>
                            <Input
                              id="companyName"
                              type="text"
                              placeholder="Nhập tên công ty đăng ký kinh doanh"
                            />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">
                              Công ty bạn đang có nhu cầu tuyển dụng không?
                            </Label>
                            <RadioGroup
                              defaultValue="yes"
                              className="flex space-x-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="hiring-yes" />
                                <Label htmlFor="hiring-yes">Có</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="hiring-no" />
                                <Label htmlFor="hiring-no">Không</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="employer-terms" />
                        <Label htmlFor="employer-terms" className="text-sm">
                          Tôi đã đọc và chấp nhận{" "}
                          <Link
                            href="#"
                            className="text-blue-500 hover:underline"
                          >
                            Điều Khoản Sử Dụng
                          </Link>{" "}
                          và{" "}
                          <Link
                            href="#"
                            className="text-blue-500 hover:underline"
                          >
                            Chính Sách Bảo Mật
                          </Link>{" "}
                          của Job Huntly
                        </Label>
                      </div>

                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Đăng Ký
                      </Button>
                    </form>
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
                {activeTab === "candidate" ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Tham gia{" "}
                      <strong className="text-blue-600">Job Huntly</strong> ngay
                      hôm nay
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
                        src="/placeholder.svg?height=160&width=160&text=Join+Us"
                        alt="Join Us"
                        width={160}
                        height={160}
                      />
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">
                        Đăng ký ngay để khám phá hàng ngàn cơ hội việc làm hấp
                        dẫn
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
                          <li key={index} className="flex items-start">
                            <div className="text-orange-500 mr-2">•</div>
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
                      Tạo ngay tài khoản để tuyển dụng các Lập Trình Viên Hàng
                      Đầu trên Job Huntly
                    </p>
                    <div className="flex justify-center mb-8">
                      <Image
                        src="/placeholder.svg?height=160&width=160&text=Recruit"
                        alt="Recruit"
                        width={160}
                        height={160}
                      />
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">
                        Tại sao chọn Job Huntly cho tuyển dụng?
                      </h4>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Cơ sở dữ liệu ứng viên IT lớn nhất",
                          "Công cụ tìm kiếm ứng viên thông minh",
                          "Hỗ trợ đăng tin tuyển dụng miễn phí",
                          "Quản lý quy trình tuyển dụng hiệu quả",
                          "Tư vấn chiến lược tuyển dụng",
                        ].map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="text-orange-500 mr-2">•</div>
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
