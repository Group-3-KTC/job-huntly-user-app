"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/validation/loginSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import googleLogo from "@/assets/images/logo-gg.png";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../ui/loadingScreen";
import { loginThunk } from "@/features/auth/authSlice";
import { selectAuthLoading } from "@/features/auth/authSelectors";
import GoogleSignIn from "@/components/auth/GoogleSignIn";

const CandidateLoginForm = ({ role }) => {
    const dispatch = useDispatch();

    const isAuthLoading = useSelector(selectAuthLoading);

    const router = useRouter();

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
            role: role ?? "CANDIDATE",
        };

        try {
            const result = await dispatch(loginThunk(payload)).unwrap();
            const roleRes = result?.user?.role;

            const okMsg = result?.message || "Đăng nhập thành công!";

            router.replace("/");

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
        <>
            <div className="space-y-3">
                {/*<Button*/}
                {/*    variant="outline"*/}
                {/*    className="flex items-center justify-center w-full gap-2 bg-transparent"*/}
                {/*    // onClick={handleGoogleLogin}*/}
                {/*>*/}
                {/*    <Image*/}
                {/*        src={googleLogo}*/}
                {/*        alt="Google"*/}
                {/*        width={24}*/}
                {/*        height={24}*/}
                {/*    />*/}
                {/*    Đăng nhập với Google*/}
                {/*</Button>*/}
                <GoogleSignIn role={role ?? "CANDIDATE"} />
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 mt-3 mb-3 text-gray-500 bg-white">
                        Hoặc
                    </span>
                </div>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="email">ID tài khoản</Label>
                    <div className="relative">
                        <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email"
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
                    <Label htmlFor="password">Mật khẩu</Label>
                    <div className="relative">
                        <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                            id="password"
                            type={"password"}
                            placeholder="Enter password"
                            className="pl-10 pr-10"
                            {...register("password")}
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
                    className="w-full bg-blue-500 hover:bg-blue-600"
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
        </>
    );
};

export default CandidateLoginForm;
