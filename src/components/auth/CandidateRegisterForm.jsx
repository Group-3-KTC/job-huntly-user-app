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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingScreen from "../ui/loadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoading } from "@/features/auth/authSelectors";
import { registerThunk } from "@/features/auth/authSlice";

const CandidateRegisterForm = ({ role }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthLoading = useSelector(selectAuthLoading);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        const payload = {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: role || "CANDIDATE",
        };

        try {
            const result = await dispatch(registerThunk(payload)).unwrap();
            const okMsg =
                result?.message ||
                "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.";
            toast.success(okMsg, {
                autoClose: 1000,
                onClose: () => router.push("/login"),
            });
        } catch (err) {
            const msg =
                err?.message ||
                err?.detail ||
                err?.title ||
                (typeof err === "string"
                    ? err
                    : "Đăng ký thất bại. Vui lòng thử lại.");
            toast.error(msg);
        }
    };

    if (isAuthLoading) {
        return <LoadingScreen message="Registering..." />;
    }

    return (
        <div className="space-y-4">
            {/* Social Register Buttons */}
            <div className="space-y-3">
                <Button
                    variant="outline"
                    className="flex items-center justify-center w-full gap-2 bg-transparent"
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
                    <span className="px-2 text-gray-500 bg-white">Hoặc</span>
                </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <div className="relative">
                        <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                            id="fullName"
                            type="text"
                            placeholder="Nhập họ và tên"
                            className="pl-10"
                            {...register("fullName")}
                        />
                    </div>

                    {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Nhập email"
                            className="pl-10"
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <div className="relative">
                        <Phone className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            className="pl-10"
                            {...register("phone")}
                        />
                    </div>
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.phone.message}
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
                            placeholder="Nhập mật khẩu"
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

                <div>
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                    <div className="relative">
                        <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Vui lòng xác nhận mật khẩu"
                            className="pl-10 pr-10"
                            {...register("confirmPassword")}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center">
                    <Checkbox
                        id="candidate-terms"
                        checked={watch("terms")}
                        onCheckedChange={(checked) =>
                            setValue("terms", checked)
                        }
                    />
                    <div htmlFor="candidate-terms" className="text-sm">
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
                    </div>
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
                    Đăng Ký
                </Button>
            </form>
        </div>
    );
};

export default CandidateRegisterForm;
