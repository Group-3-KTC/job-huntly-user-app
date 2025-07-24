"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validation/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  // const { status, error, user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("candidate");
  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const user = await dispatch(loginUser(data)).unwrap();
      console.log("✅ Login thành công:", user);
    } catch (errorMessage) {
      console.error("Login thất bại:", errorMessage);
    }
  };

  // useEffect(() => {
  //   if (status === "succeeded") {
  //     console.log("✅ Login thành công:", user);
  //     // Ví dụ: chuyển hướng
  //     // router.push('/dashboard');
  //   }
  //
  //   if (status === "failed") {
  //     console.error("❌ Login thất bại:", error);
  //   }
  // }, [status, error]);

  return (
    <div className="min-h-screen bg-orange-50">
      <main className="container py-8 mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Login Form */}
          <div className="w-full lg:w-1/2">
            <Card className="shadow-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold">
                  Đăng nhập
                </CardTitle>
                <p className="text-gray-600">
                  Liên kết tài khoản của bạn để tiếp tục sử dụng dịch vụ của Job
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
                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="flex items-center justify-center w-full gap-2 bg-transparent"
                      >
                        <Image
                          src="/placeholder.svg?height=24&width=24&text=G"
                          alt="Google"
                          width={24}
                          height={24}
                        />
                        Tiếp tục với Google
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center w-full gap-2 text-white bg-gray-800 hover:bg-gray-700"
                      >
                        <Image
                          src="/placeholder.svg?height=24&width=24&text=GH"
                          alt="GitHub"
                          width={24}
                          height={24}
                        />
                        Tiếp tục với GitHub
                      </Button>
                    </div>

                    <p className="text-sm text-center text-gray-500">
                      Bằng việc tiếp tục, bạn đồng ý với{" "}
                      <Link href="#" className="text-blue-500 hover:underline">
                        Điều khoản Sử Dụng
                      </Link>{" "}
                      và{" "}
                      <Link href="#" className="text-blue-500 hover:underline">
                        Chính Sách Bảo Mật
                      </Link>{" "}
                      của Job Huntly.
                    </p>

                    <div className="pt-6 border-t">
                      <p className="mb-4 font-medium">
                        Vui lòng{" "}
                        <span className="text-orange-500">Đăng nhập</span> để
                        tiếp tục sử dụng dịch vụ của Job Huntly
                      </p>

                      <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div>
                          <Label htmlFor="username">ID tài khoản</Label>
                          <div className="relative">
                            <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="Your email"
                              className="pl-10"
                              {...register("email")}
                            />
                          </div>
                          {errors.username && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.username.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="password">Mật khẩu</Label>
                          <div className="relative">
                            <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Mật khẩu"
                              className="pl-10 pr-10"
                              {...register("password")}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.password.message}
                            </p>
                          )}
                        </div>

                        <Button className="w-full bg-orange-500 hover:bg-orange-600">
                          Đăng Nhập
                        </Button>

                        <div className="text-center">
                          <Link
                            href="#"
                            className="text-sm text-blue-500 hover:underline"
                          >
                            Quên mật khẩu?
                          </Link>
                        </div>
                      </form>
                    </div>
                  </TabsContent>

                  <TabsContent value="employer" className="space-y-4">
                    <p className="mb-4 font-medium">
                      Vui lòng{" "}
                      <span className="text-orange-500">Đăng nhập</span> để tiếp
                      tục sử dụng dịch vụ của Job Huntly
                    </p>

                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="employer-username">ID tài khoản</Label>
                        <div className="relative">
                          <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                          <Input
                            id="employer-username"
                            type="text"
                            placeholder="Email / Username"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="employer-password">Mật khẩu</Label>
                        <div className="relative">
                          <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                          <Input
                            id="employer-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mật khẩu"
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Đăng Nhập
                      </Button>

                      <div className="text-center">
                        <Link
                          href="#"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Link
                      href="/register"
                      className="font-medium text-orange-500 hover:underline"
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
                    <h3 className="mb-4 text-lg font-semibold">
                      Chào mừng bạn đến với{" "}
                      <strong className="text-blue-600">Job Huntly</strong>
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
                      <h4 className="mb-2 font-semibold">
                        Đăng nhập ngay để tận dụng tối đa các công cụ của Job
                        Huntly và gia tăng cơ hội tiếp cận việc làm hot nhất
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
                          <li key={index} className="flex items-start">
                            <div className="mr-2 text-orange-500">•</div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm text-gray-800 ">
                      Nếu bạn gặp khó khăn trong việc đăng nhập / tạo tài khoản,
                      vui lòng liên hệ với Job Huntly qua email
                      contact@JobHuntly.vn
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">
                      Chào mừng Nhà tuyển dụng đến với{" "}
                      <strong className="text-blue-600">Job Huntly</strong>
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
                      <h4 className="mb-2 font-semibold">
                        Đăng nhập để truy cập các công cụ tuyển dụng mạnh mẽ
                      </h4>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Đăng tin tuyển dụng miễn phí",
                          "Tìm kiếm ứng viên phù hợp",
                          "Quản lý hồ sơ ứng tuyển",
                          "Thống kê hiệu quả tuyển dụng",
                          "Hỗ trợ tư vấn tuyển dụng",
                        ].map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 text-orange-500">•</div>
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
