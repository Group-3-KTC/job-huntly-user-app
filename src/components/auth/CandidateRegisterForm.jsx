"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import googleLogo from "@/assets/images/logo-gg.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { candidateRegisterSchema } from "@/validation/registerSchema";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { registerUser, selectAuthLoading } from "@/features/auth/authSlice";

const CandidateRegisterForm = ({ role }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectAuthLoading);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(candidateRegisterSchema),
        mode: "onChange",
        defaultValues: {
            terms: false,
        },
    });
    const onSubmit = async (data) => {
        setErrorMessage(null);

        const payload = {
            email: data.email,
            password: data.password,
            fullName: data.fullName,
            role,
        };

        try {
            const result = await dispatch(registerUser(payload)).unwrap();
            const okMsg =
                result?.message ||
                "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.";
            toast.success(okMsg);
            router.push("/login");
        } catch (err) {
            const msg =
                err?.message ||
                err?.detail ||
                err?.title ||
                (typeof err === "string"
                    ? err
                    : "Đăng ký thất bại. Vui lòng thử lại.");
            setErrorMessage(msg);
            toast.error(msg);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[290px] flex items-center justify-center ">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center">
                    <div className="mx-auto loader border-2 border-blue-500 rounded-full"></div>
                    <p className="mt-2 text-gray-500">Registering...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Social Register Buttons */}
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
                    Đăng ký với Google
                </Button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Hoặc</span>
                </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="fullname">Họ và tên</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="fullname"
                            type="text"
                            placeholder="Nhập họ và tên"
                            className="pl-10"
                            {...register("fullname")}
                        />
                    </div>

                    {errors.fullname && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.fullname.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Nhập email"
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
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            className="pl-10"
                            {...register("phone")}
                        />
                    </div>
                    {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.phone.message}
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
                            placeholder="Nhập mật khẩu"
                            className="pr-10 pl-10"
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

                <div>
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Vui lòng xác nhận mật khẩu"
                            className="pr-10 pl-10"
                            {...register("confirmPassword")}
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
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap">
                    <Checkbox
                        id="candidate-terms"
                        checked={watch("terms")}
                        onCheckedChange={(checked) =>
                            setValue("terms", checked)
                        }
                    />
                    <Label htmlFor="candidate-terms" className="text-sm">
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
                    {errors.terms && (
                        <p className="text-sm text-red-500">
                            {errors.terms.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Register
                </Button>
            </form>
        </div>
    );
};

export default CandidateRegisterForm;
