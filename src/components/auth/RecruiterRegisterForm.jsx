"use client";

import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Eye, EyeOff, Lock, Mail, Phone, User} from "lucide-react";
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

const RecruiterRegisterForm = ({role}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isAuthLoading = useSelector(selectAuthLoading);

    const {
        register,
        handleSubmit,
        formState: {errors},
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
                "Registration successful! Please check your email to activate your account.";
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
                    : "Registration failed. Please try again.");
            toast.error(msg);
        }
    };

    if (isAuthLoading) {
        return <LoadingScreen message="Registering..."/>;
    }
    return (
        <div className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                        <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"/>
                        <Input
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
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
                        <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"/>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                        <Phone className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"/>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
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
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"/>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="pl-10 pr-10"
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4"/>
                            ) : (
                                <Eye className="w-4 h-4"/>
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
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"/>
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Please confirm your password"
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
                                <EyeOff className="w-4 h-4"/>
                            ) : (
                                <Eye className="w-4 h-4"/>
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap">
                    <Checkbox
                        id="recruiter-terms"
                        checked={watch("terms")}
                        onCheckedChange={(checked) =>
                            setValue("terms", checked)
                        }
                    />
                    <div htmlFor="recruiter-terms" className="text-sm">
                        I have read and agree to the{" "}
                        <Link
                            href="#"
                            className="text-orange-500 hover:underline"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="#"
                            className="text-orange-500 hover:underline"
                        >
                            Privacy Policy
                        </Link>{" "}
                        of Job Huntly
                    </div>
                    {errors.terms && (
                        <p className="text-sm text-red-500">
                            {errors.terms.message}
                        </p>
                    )}
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default RecruiterRegisterForm;
