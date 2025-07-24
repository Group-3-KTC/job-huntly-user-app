"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/validation/loginSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import Image from "next/image";
import googleLogo from "@/assets/images/logo-gg.png";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/features/auth/authApi";

const CandidateLoginForm = ({ role }) => {
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await login({ ...data, role }).unwrap();
            localStorage.setItem("token", res.token);
            localStorage.setItem("role", res.user.role);

            alert("Candidate đăng nhập thành công!");
            router.push("/candidate/dashboard");
        } catch (err) {
            const msg = err?.data?.message || "Đăng nhập thất bại";
            setErrorMessage(msg);
            alert(msg); // sẽ thay bằng toast sau
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[290px] flex items-center justify-center ">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center">
                    <div className="mx-auto loader border-2 border-blue-500 rounded-full  animate-spin"></div>
                    <p className="mt-2 text-gray-500">Đang đăng nhập...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-3">
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 bg-transparent"
                >
                    <Image
                        src={googleLogo}
                        alt="Google"
                        width={24}
                        height={24}
                    />
                    Đăng nhập với Google
                </Button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500 mt-3 mb-3">
                        Hoặc
                    </span>
                </div>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="email">ID tài khoản</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            className="pl-10"
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="password">Mật khẩu</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="pl-10 pr-10"
                            {...register("password")}
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
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
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
        </>
    );
};

export default CandidateLoginForm;
