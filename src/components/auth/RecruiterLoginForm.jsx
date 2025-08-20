import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validation/loginSchema";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/features/auth/fakeAuthApi";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoading } from "@/features/auth/fakeAuthSlice";
import LoadingScreen from "../ui/loadingScreen";
import { loginThunk } from "@/features/auth/authSlice";
import { toast } from "react-toastify";

const RecruiterLoginForm = ({ role }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthLoading = useSelector(selectAuthLoading);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (form) => {
        const payload = {
            email: form.email,
            password: form.password,
            role: role ?? "RECRUITER",
        };

        try {
            const result = await dispatch(loginThunk(payload)).unwrap();
            const roleRes = result?.user?.role;

            const okMsg = result?.message || "Đăng nhập thành công!";

            router.replace("/recruiter/dashboard");

            toast.success(okMsg, {
                autoClose: 3000,
            });
        } catch (err) {
            const msg =
                err?.detail ||
                err?.title ||
                err?.message ||
                err?.data?.message ||
                "Đăng nhập thất bại";
            toast.error(msg);
        }
    };

    if (isAuthLoading) {
        return <LoadingScreen message="Đang đăng nhập..." />;
    }
    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor="recruiter-username">ID tài khoản</Label>
                <div className="relative">
                    <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <Input
                        id="recruiter-email"
                        type="email"
                        placeholder="Enter email"
                        className="pl-10"
                        {...register("email")}
                        autoComplete="username"
                    />
                </div>
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="recruiter-password">Mật khẩu</Label>
                <div className="relative">
                    <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <Input
                        id="recruiter-password"
                        type="password"
                        placeholder="Enter password"
                        className="pl-10 pr-10"
                        {...register("password")}
                        autoComplete="current-password"
                    />
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
            >
                Login
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
    );
};

export default RecruiterLoginForm;
