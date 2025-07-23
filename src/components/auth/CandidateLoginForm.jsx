import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/features/auth/authSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/validation/loginSchema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff, Lock, User } from "lucide-react";

const CandidateLoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(loginUser(data)).unwrap();
      alert("Candidate login thành công" + user);
      console.log("Candidaate Login thành công:", user);
    } catch (err) {
      alert("Candidate login thất bại: " + err);
      console.error("Candidate Login thất bại:", err);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">ID tài khoản</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            className="pl-10"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Mật khẩu</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button className="w-full bg-orange-500 hover:bg-orange-600">
        Đăng Nhập
      </Button>

      <div className="text-center">
        <Link href="#" className="text-sm text-blue-500 hover:underline">
          Quên mật khẩu?
        </Link>
      </div>
    </form>
  );
};

export default CandidateLoginForm;
