"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recruiterRegisterSchema } from "@/validation/registerSchema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingScreen from "../ui/loadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "@/features/auth/authSlice";
import { selectAuthLoading } from "@/features/auth/authSelectors";

const RecruiterRegisterForm = ({ role }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isAuthLoading = useSelector(selectAuthLoading);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(recruiterRegisterSchema),
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
            role: role || "RECRUITER",
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
        return <LoadingScreen message="Đang đăng ký..." />;
    }
    return (
        <div className="space-y-4">
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

                {/*<div className="pt-4 border-t">*/}
                {/*    <h4 className="mb-4 font-medium text-orange-500">*/}
                {/*        Thông Tin Công Ty*/}
                {/*    </h4>*/}

                {/*    <div className="space-y-4">*/}
                {/*        <div>*/}
                {/*            <Label htmlFor="taxCode">Mã số thuế</Label>*/}
                {/*            <div className="relative">*/}
                {/*                <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />*/}
                {/*                <Input*/}
                {/*                    id="taxCode"*/}
                {/*                    type="text"*/}
                {/*                    placeholder="Nhập mã số thuế"*/}
                {/*                    className="pl-10"*/}
                {/*                    {...register("taxCode")}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            {errors.taxCode && (*/}
                {/*                <p className="mt-1 text-sm text-red-500">*/}
                {/*                    {errors.taxCode.message}*/}
                {/*                </p>*/}
                {/*            )}*/}
                {/*        </div>*/}

                {/*        <div>*/}
                {/*            <Label htmlFor="companyName">*/}
                {/*                Tên công ty đăng ký kinh doanh*/}
                {/*            </Label>*/}
                {/*            <div className="relative">*/}
                {/*                <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />*/}
                {/*                <Input*/}
                {/*                    id="companyName"*/}
                {/*                    type="text"*/}
                {/*                    placeholder="Nhập tên công ty đăng ký kinh doanh"*/}
                {/*                    className="pl-10"*/}
                {/*                    {...register("companyName")}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            {errors.companyName && (*/}
                {/*                <p className="mt-1 text-sm text-red-500">*/}
                {/*                    {errors.companyName.message}*/}
                {/*                </p>*/}
                {/*            )}*/}
                {/*        </div>*/}

                {/*        <div>*/}
                {/*            <Label className="text-sm font-medium">*/}
                {/*                Công ty bạn đang có nhu cầu tuyển dụng không?*/}
                {/*            </Label>*/}
                {/*            <RadioGroup*/}
                {/*                defaultValue="yes"*/}
                {/*                className="flex mt-2 space-x-4"*/}
                {/*            >*/}
                {/*                <div className="flex items-center space-x-2">*/}
                {/*                    <RadioGroupItem*/}
                {/*                        value="yes"*/}
                {/*                        id="hiring-yes"*/}
                {/*                    />*/}
                {/*                    <Label htmlFor="hiring-yes">Có</Label>*/}
                {/*                </div>*/}
                {/*                <div className="flex items-center space-x-2">*/}
                {/*                    <RadioGroupItem value="no" id="hiring-no" />*/}
                {/*                    <Label htmlFor="hiring-no">Không</Label>*/}
                {/*                </div>*/}
                {/*            </RadioGroup>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="flex flex-wrap">
                    <Checkbox
                        id="recruiter-terms"
                        checked={watch("terms")}
                        onCheckedChange={(checked) =>
                            setValue("terms", checked)
                        }
                    />
                    <div htmlFor="recruiter-terms" className="text-sm">
                        Tôi đã đọc và chấp nhận{" "}
                        <Link
                            href="#"
                            className="text-orange-500 hover:underline"
                        >
                            Điều Khoản Sử Dụng
                        </Link>{" "}
                        và{" "}
                        <Link
                            href="#"
                            className="text-orange-500 hover:underline"
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

                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Đăng Ký
                </Button>
            </form>
        </div>
    );
};

export default RecruiterRegisterForm;
