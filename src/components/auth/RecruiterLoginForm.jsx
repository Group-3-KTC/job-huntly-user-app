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
import { useSelector } from "react-redux";
import { selectAuthLoading } from "@/features/auth/authSlice";

const RecruiterLoginForm = ({ role }) => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(null);
    const isAuthLoading = useSelector(selectAuthLoading);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const res = await login({ ...data, role }).unwrap();

            alert("Recruiter đăng nhập thành công!");
            router.push("/recruiters");
        } catch (err) {
            const msg = err?.data?.message || "Đăng nhập thất bại";
            setErrorMessage(msg);
            alert(msg); // sẽ thay bằng toast sau
        }
    };
    if (isAuthLoading) {
        return (
            <div className="min-h-[290px] flex items-center justify-center ">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center">
                    <div className="mx-auto loader border-2 border-blue-500 rounded-full"></div>
                    <p className="mt-2 text-gray-500">Đang đăng nhập...</p>
                </div>
            </div>
        );
    }
    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor="recruiter-username">ID tài khoản</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        id="recruiter-email"
                        type="email"
                        placeholder="Enter email"
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
                <Label htmlFor="recruiter-password">Mật khẩu</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        id="recruiter-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="pl-10 pr-10"
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

            <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Đăng Nhập
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
