"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recruiterRegisterSchema } from "@/validation/registerSchema";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/features/auth/authApi";

const RecruiterRegisterForm = ({ role }) => {
    const router = useRouter();
    const [registerApi, { isLoading }] = useRegisterMutation();
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
        resolver: yupResolver(recruiterRegisterSchema),
        defaultValues: {
            terms: false,
        },
    });
    const onSubmit = async (data) => {
        try {
            const res = await registerApi({ ...data, role }).unwrap();
            // localStorage.setItem("token", res.token);
            // localStorage.setItem("role", res.user.role);

            console.log("Register data:", { ...data, role });
            alert("Recruiter đăng ký thành công! Vui lòng đăng nhập");
            router.push("/login");
        } catch (err) {
            const msg = err?.data?.message || "Đăng ký thất bại";
            setErrorMessage(msg);
            alert(msg);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[500px] flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center">
                    <div className="mx-auto w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-2 text-gray-500">Đang đăng ký...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-4">
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

                {/*<div className="border-t pt-4">*/}
                {/*    <h4 className="text-orange-500 font-medium mb-4">*/}
                {/*        Thông Tin Công Ty*/}
                {/*    </h4>*/}

                {/*    <div className="space-y-4">*/}
                {/*        <div>*/}
                {/*            <Label htmlFor="taxCode">Mã số thuế</Label>*/}
                {/*            <div className="relative">*/}
                {/*                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />*/}
                {/*                <Input*/}
                {/*                    id="taxCode"*/}
                {/*                    type="text"*/}
                {/*                    placeholder="Nhập mã số thuế"*/}
                {/*                    className="pl-10"*/}
                {/*                    {...register("taxCode")}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            {errors.taxCode && (*/}
                {/*                <p className="text-sm text-red-500 mt-1">*/}
                {/*                    {errors.taxCode.message}*/}
                {/*                </p>*/}
                {/*            )}*/}
                {/*        </div>*/}

                {/*        <div>*/}
                {/*            <Label htmlFor="companyName">*/}
                {/*                Tên công ty đăng ký kinh doanh*/}
                {/*            </Label>*/}
                {/*            <div className="relative">*/}
                {/*                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />*/}
                {/*                <Input*/}
                {/*                    id="companyName"*/}
                {/*                    type="text"*/}
                {/*                    placeholder="Nhập tên công ty đăng ký kinh doanh"*/}
                {/*                    className="pl-10"*/}
                {/*                    {...register("companyName")}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            {errors.companyName && (*/}
                {/*                <p className="text-sm text-red-500 mt-1">*/}
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
                {/*                className="flex space-x-4 mt-2"*/}
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
                    <Label htmlFor="recruiter-terms" className="text-sm">
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
                    </Label>
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
