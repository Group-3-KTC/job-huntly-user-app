"use client";

import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Eye, EyeOff, Lock, Mail} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "@/validation/loginSchema";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import LoadingScreen from "../ui/loadingScreen";
import {loginThunk} from "@/features/auth/authSlice";
import {toast} from "react-toastify";
import {selectAuthLoading} from "@/features/auth/authSelectors";
import clsx from "clsx";

const RecruiterLoginForm = ({role, onForgot}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthLoading = useSelector(selectAuthLoading);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
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
        return <LoadingScreen message="Logging in..." loaderClassName="loader--orange"/>;
    }
    return (
        <div className="w-full">
            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                        <Label
                            htmlFor="recruiter-email"
                            className="text-orange-900/80 font-medium"
                        >
                            Email
                        </Label>
                        <div className="relative mt-1">
                            <Mail
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-300"/>
                            <Input
                                id="recruiter-email"
                                type="email"
                                placeholder="you@company.com"
                                autoComplete="username"
                                className={clsx(
                                    "pl-10",
                                    "focus-visible:ring-orange-500 focus-visible:ring-2",
                                )}
                                {...register("email")}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <Label
                            htmlFor="recruiter-password"
                            className="text-orange-900/80 font-medium"
                        >
                            Password
                        </Label>
                        <div className="relative mt-1">
                            <Lock
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-300"/>
                            <Input
                                id="recruiter-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className={clsx(
                                    "pl-10 pr-10",
                                    "focus-visible:ring-orange-500 focus-visible:ring-2",
                                )}
                                {...register("password")}
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-600 transition"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={clsx(
                            "w-full",
                            "bg-orange-600 hover:bg-orange-700",
                            "focus-visible:ring-2 focus-visible:ring-orange-500",
                        )}
                    >
                        {isSubmitting ? "Signing in..." : "Login"}
                    </Button>

                    <div className="pt-2 text-center text-sm text-orange-900/70">
                        Don’t have an account?{" "}
                        <a
                            href="/register"
                            className="font-medium text-orange-600 hover:text-orange-700 hover:underline"
                        >
                            Create one
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecruiterLoginForm;

