"use client";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {loginSchema} from "@/validation/loginSchema";
import {Button} from "@/components/ui/button";
import {Eye, EyeOff, Lock, Mail} from "lucide-react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import LoadingScreen from "../ui/loadingScreen";
import {loginThunk} from "@/features/auth/authSlice";
import {selectAuthLoading} from "@/features/auth/authSelectors";
import GoogleSignIn from "@/components/auth/GoogleSignIn";
import {clearNormalizedProfile} from "@/features/profile/profileSlice";
import {profileApi} from "@/services/profileService";
import clsx from "clsx";
import BannedPanel from "@/components/auth/BannedPanel";
import {Dialog, DialogContent} from "@/components/ui/dialog";

const CandidateLoginForm = ({role, onGoogleNeedsPassword, onForgot}) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showSetPwPanel, setShowSetPwPanel] = useState(false);
    const [googleEmail, setGoogleEmail] = useState("");
    const [bannedInfo, setBannedInfo] = useState(null);

    const isAuthLoading = useSelector(selectAuthLoading);

    const router = useRouter();

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
            role: role ?? "CANDIDATE",
        };

        try {
            const result = await dispatch(loginThunk(payload)).unwrap();

            dispatch(clearNormalizedProfile());
            dispatch(
                profileApi.util.invalidateTags([
                    "combinedProfile",
                    "profile",
                    "candidateSkills",
                    "softSkills",
                    "education",
                    "workExperience",
                    "certificates",
                    "awards",
                ])
            );

            const roleRes = result?.user?.role;

            const okMsg = result?.message || "Login successful!";

            router.replace("/");

            toast.success(okMsg, {
                autoClose: 3000,
            });
        } catch (err) {
            if (err?.status === 403 && err?.code === "ACCOUNT_BANNED") {
                const contact = err?.extra?.contactEmail || "contact.jobhuntly@gmail.com";
                setBannedInfo({
                    email: payload.email,
                    contactEmail: contact,
                    reason: err?.extra?.reason || "",
                });
                return;
            }
            if (err?.status === 409 && (err?.code === "GOOGLE_ACCOUNT_NEEDS_PASSWORD")) {
                onGoogleNeedsPassword?.(err?.extra?.email || payload.email);
                return;
            }
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

    // if (bannedInfo) {
    //     return (
    //         <div
    //             className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
    //             role="dialog"
    //             aria-modal="true"
    //         >
    //             <div className="w-full max-w-md">
    //                 <BannedPanel
    //                     email={bannedInfo.email}
    //                     contactEmail={bannedInfo.contactEmail}
    //                     reason={bannedInfo.reason}
    //                     onDismiss={() => setBannedInfo(null)}
    //                 />
    //             </div>
    //         </div>
    //     );
    // }


    return (
        <>
            <Dialog
                open={!!bannedInfo}
                onOpenChange={(open) => {
                    if (!open) setBannedInfo(null);
                }}
            >
                <DialogContent
                    className="sm:max-w-md p-0 border-none bg-transparent shadow-none"
                    // Nếu muốn **chặn** đóng khi click outside / ESC, dùng 2 handler dưới:
                    // onInteractOutside={(e) => e.preventDefault()}
                    // onEscapeKeyDown={(e) => e.preventDefault()}
                >
                    <BannedPanel
                        email={bannedInfo?.email}
                        contactEmail={bannedInfo?.contactEmail}
                        reason={bannedInfo?.reason}
                        onDismiss={() => setBannedInfo(null)}
                    />
                </DialogContent>
            </Dialog>

            <div className="w-full">


                {/* Social */}
                <div className="space-y-3">
                    <GoogleSignIn role={role ?? "CANDIDATE"} onBanned={(info) => {
                        setBannedInfo({
                            email: info.email || "",
                            contactEmail: info.contactEmail,
                            reason: info.reason || "",
                        });
                    }}/>
                </div>

                {/* Separator */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-blue-100"/>
                    </div>
                    <div className="relative flex justify-center">
          <span className="px-3 text-xs font-medium tracking-wider text-blue-500 bg-white">
            OR
          </span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Email */}
                        <div>
                            <Label
                                htmlFor="email"
                                className="text-blue-900/80 font-medium"
                            >
                                Email
                            </Label>
                            <div className="relative mt-1">
                                <Mail
                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300"/>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className={clsx(
                                        "pl-10",
                                        "focus-visible:ring-blue-500 focus-visible:ring-2",
                                    )}
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <Label
                                htmlFor="password"
                                className="text-blue-900/80 font-medium"
                            >
                                Password
                            </Label>
                            <div className="relative mt-1">
                                <Lock
                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300"/>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className={clsx(
                                        "pl-10 pr-10",
                                        "focus-visible:ring-blue-500 focus-visible:ring-2",
                                    )}
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition"
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
                                "bg-blue-600 hover:bg-blue-700",
                                "focus-visible:ring-2 focus-visible:ring-blue-500",
                            )}
                        >
                            {isSubmitting ? "Signing in..." : "Login"}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CandidateLoginForm;
