"use client";

import React, { useState } from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import {Button} from "@/components/ui/button";

import Link from "next/link";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "@/validation/loginSchema";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import LoadingScreen from "../ui/loadingScreen";
import {loginThunk} from "@/features/auth/authSlice";
import {toast} from "react-toastify";
import {selectAuthLoading} from "@/features/auth/authSelectors";

const RecruiterLoginForm = ({role}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthLoading = useSelector(selectAuthLoading);
    const [showPassword, setShowPassword] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (form) => {
        const payload = {
            email: form.email,
            password: form.password,
        };

        try {
            const result = await dispatch(loginThunk(payload)).unwrap();
            const roleRes = result?.user?.role;

            const okMsg = result?.message || "Login successful!";

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
                "Login failed";
            toast.error(msg);
        }
    };

    if (isAuthLoading) {
        return <LoadingScreen message="Logging in..."/>;
    }
    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor="recruiter-username">Email</Label>
                <div className="relative">
                    <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"/>
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
                <Label htmlFor="recruiter-password">Password</Label>
                <div className="relative">
                    <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"/>
                    <Input
                        id="recruiter-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="pl-10 pr-10"
                        {...register("password")}
                        autoComplete="current-password"
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
                    Forgot password?
                </Link>
            </div>
        </form>
    );
};

export default RecruiterLoginForm;

