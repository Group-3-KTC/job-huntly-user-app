"use client";

import React, {useMemo, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {CheckCircle2, Eye, EyeOff, Lock, Mail, Phone, User} from "lucide-react";
import Link from "next/link";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {recruiterRegisterSchema} from "@/validation/registerSchema";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import LoadingScreen from "../ui/loadingScreen";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "@/features/auth/authSlice";
import {selectAuthLoading} from "@/features/auth/authSelectors";
import clsx from "clsx";

export default function RecruiterRegisterForm({role, onRegistered}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isAuthLoading = useSelector(selectAuthLoading);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting, isValid},
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(recruiterRegisterSchema),
        mode: "onChange",
        defaultValues: {terms: false},
    });

    const pwd = watch("password") || "";

    const rules = useMemo(() => {
        const len = pwd.length >= 8;
        const upper = /[A-Z]/.test(pwd);
        const lower = /[a-z]/.test(pwd);
        const digit = /\d/.test(pwd);
        const special = /[^A-Za-z0-9]/.test(pwd);
        const score = [len, upper, lower, digit, special].filter(Boolean).length;
        return {len, upper, lower, digit, special, score};
    }, [pwd]);

    const strengthLabelMap = ["Very weak", "Weak", "Fair", "Good", "Strong"];
    const strengthLabel =
        pwd.length === 0 ? "" : strengthLabelMap[Math.max(0, rules.score - 1)];

    const barColorMap = [
        "bg-orange-300",
        "bg-orange-400",
        "bg-orange-500",
        "bg-orange-600",
        "bg-orange-700",
    ];
    const barColor = barColorMap[Math.max(0, rules.score - 1)];
    const meterPct = (rules.score / 5) * 100;
    const scrollToTop = () => {
        const el = document.scrollingElement || document.documentElement;
        el.scrollTo({top: 0, behavior: "smooth"});
    };


    const onSubmit = async (data) => {
        const payload = {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: role || "RECRUITER",
        };

        try {
            scrollToTop();
            const result = await dispatch(registerThunk(payload)).unwrap();
            const okMsg =
                result?.message ||
                "Registration successful! Please check your email to activate your account.";
            toast.success(okMsg, {autoClose: 1200});

            try {
                localStorage.setItem(`activationResendAt:${data.email}`, String(Date.now()));
            } catch {
            }

            onRegistered?.(data.email);
        } catch (err) {
            const msg =
                err?.message ||
                err?.detail ||
                err?.title ||
                (typeof err === "string"
                    ? err
                    : "Registration failed. Please try again.");
            toast.error(msg);
        }
    };

    if (isAuthLoading) return <LoadingScreen message="Registering..." loaderClassName="loader--orange"/>;

    return (
        <div className="w-full">
            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Full Name */}
                    <div>
                        <Label htmlFor="fullName" className="text-orange-900/80 font-medium">
                            Full Name
                        </Label>
                        <div className="relative mt-1">
                            <User
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-300"/>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                className="pl-10 focus-visible:ring-2 focus-visible:ring-orange-500"
                                {...register("fullName")}
                                autoComplete="name"
                            />
                        </div>
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" className="text-orange-900/80 font-medium">
                            Email
                        </Label>
                        <div className="relative mt-1">
                            <Mail
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-300"/>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                className="pl-10 focus-visible:ring-2 focus-visible:ring-orange-500"
                                {...register("email")}
                                autoComplete="email"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <Label htmlFor="phone" className="text-orange-900/80 font-medium">
                            Phone Number
                        </Label>
                        <div className="relative mt-1">
                            <Phone
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-300"/>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                className="pl-10 focus-visible:ring-2 focus-visible:ring-orange-500"
                                {...register("phone")}
                                autoComplete="tel"
                            />
                        </div>
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <Label htmlFor="password" className="text-orange-900/80 font-medium">
                            Password
                        </Label>
                        <div className="relative mt-1">
                            <Lock
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-300"/>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="pl-10 pr-10 focus-visible:ring-2 focus-visible:ring-orange-500"
                                {...register("password")}
                                autoComplete="new-password"
                                aria-describedby="pw-strength"
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

                        {/* Strength UI */}
                        {pwd.length > 0 && (
                            <div className="mt-2" aria-live="polite" id="pw-strength">
                                <div
                                    className="h-1.5 w-full rounded bg-orange-100 overflow-hidden"
                                    role="progressbar"
                                    aria-valuemin={0}
                                    aria-valuemax={5}
                                    aria-valuenow={rules.score}
                                >
                                    <div
                                        className={`h-full transition-all ${barColor}`}
                                        style={{width: `${meterPct}%`}}
                                    />
                                </div>
                                <div className="mt-1 text-[11px] font-medium text-orange-700">
                                    Strength: {strengthLabel}
                                </div>

                                <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                                    <Rule ok={rules.len} label="At least 8 characters"/>
                                    <Rule ok={rules.digit} label="Contains a number"/>
                                    <Rule ok={rules.upper} label="Uppercase letter"/>
                                    <Rule ok={rules.lower} label="Lowercase letter"/>
                                    <Rule ok={rules.special} label="Special character"/>
                                </ul>
                            </div>
                        )}
                    </div>


                    {/* Confirm Password */}
                    <div>
                        <Label htmlFor="confirmPassword" className="text-orange-900/80 font-medium">
                            Confirm Password
                        </Label>
                        <div className="relative mt-1">
                            <Lock
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-300"/>
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Re-enter your password"
                                className="pl-10 pr-10 focus-visible:ring-2 focus-visible:ring-orange-500"
                                {...register("confirmPassword")}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                onClick={() => setShowConfirmPassword((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-600 transition"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Terms */}
                    <div className="flex gap-3">
                        <Checkbox
                            id="recruiter-terms"
                            checked={!!watch("terms")}
                            onCheckedChange={(checked) =>
                                setValue("terms", !!checked, {shouldValidate: true})
                            }
                            className="mt-0.5 flex-shrink-0 border-gray-300 hover:border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <div className="flex-1">
                            <Label
                                htmlFor="recruiter-terms"
                                className="text-sm text-orange-900/80 leading-6 cursor-pointer block"
                            >
                                I have read and agree to the{" "}
                                <Link href="#"
                                      className="text-orange-600 hover:text-orange-700 hover:underline font-medium">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="#"
                                      className="text-orange-600 hover:text-orange-700 hover:underline font-medium">
                                    Privacy Policy
                                </Link>{" "}
                                of JobHuntly
                            </Label>
                        </div>
                    </div>
                    {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={clsx(
                            "w-full",
                            "bg-orange-600 hover:bg-orange-700",
                            "focus-visible:ring-2 focus-visible:ring-orange-500",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                        )}
                    >
                        {isSubmitting ? "Creating account..." : "Sign Up"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

function Rule({ok, label}) {
    return (
        <li className={`flex items-center gap-2 ${ok ? "text-green-600" : "text-gray-500"}`}>
            <CheckCircle2 className={`h-3.5 w-3.5 ${ok ? "" : "opacity-40"}`}/>
            <span>{label}</span>
        </li>
    );
}
