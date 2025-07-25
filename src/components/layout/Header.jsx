"use client";
import {
    ChevronDown,
    Search,
    Bookmark,
    ListChecks,
    ClipboardCheck,
    Building,
    Star,
    Crown,
    TrendingUp,
    Eye,
    Headphones,
    User,
    Bell,
    FileText,
    Briefcase,
    Heart,
    Settings,
    LogOut,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/assets/images/logo-title-white.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
    selectAuthHydrated,
    selectAuthLoading,
    selectIsLoggedIn,
    selectUser,
} from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/features/auth/authApi";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [notificationCount, setNotificationCount] = useState(3);
    const router = useRouter();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const isAuthLoading = useSelector(selectAuthLoading);

    const [logoutMutation] = useLogoutMutation();

    const isAuthHydrated = useSelector(selectAuthHydrated);

    if (!isAuthHydrated) {
        return null;
    }

    const handleMouseEnter = (menu) => {
        setActiveDropdown(menu);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };
    const handleRegisterClick = () => {
        router.push("/register");
    };

    const handleLoginClick = () => {
        router.push("/login");
    };

    const handleProfileClick = () => {
        router.push("/candidate");
    };
    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
            router.push("/");
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
            router.push("/");
        }
    };

    const jobsContent = (
        <div className="flex gap-8">
            <div className="flex-1">
                <div className="mb-6">
                    <div className="mb-3 text-xs font-medium tracking-wide text-gray-500 uppercase">
                        VIỆC LÀM
                    </div>
                    <div className="space-y-2">
                        <Link href="/search">
                            <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                                <Search className="w-4 h-4 text-gray-600" />
                                <span className="text-sm">Tìm việc làm</span>
                            </div>
                        </Link>
                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                            <Bookmark className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Việc làm đã lưu</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                            <ListChecks className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">
                                Việc làm đã ứng tuyển
                            </span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                            <ClipboardCheck className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Việc làm phù hợp</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-3 text-xs font-medium tracking-wide text-gray-500 uppercase">
                        CÔNG TY
                    </div>
                    <div className="space-y-2">
                        <Link href="/company/company-search">
                            <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                                <Building className="w-4 h-4 text-gray-600" />
                                <span className="text-sm">
                                    Danh sách công ty
                                </span>
                            </div>
                        </Link>
                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                            <Star className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Top công ty</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="mb-3 text-xs font-medium tracking-wide text-gray-500 uppercase">
                    VIỆC LÀM THEO VỊ TRÍ
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        "Việc làm IT",
                        "Việc làm Marketing",
                        "Việc làm Sales",
                        "Việc làm Kế toán",
                        "Việc làm Nhân sự",
                        "Việc làm Tài chính",
                        "Việc làm Kinh doanh",
                        "Việc làm Logistics",
                        "Việc làm IT",
                        "Việc làm Marketing",
                        "Việc làm Sales",
                        "Việc làm Kế toán",
                        "Việc làm Nhân sự",
                        "Việc làm Tài chính",
                        "Việc làm Kinh doanh",
                        "Việc làm Logistics",
                    ].map((job, index) => (
                        <div
                            key={index}
                            className="p-2 text-sm rounded cursor-pointer hover:bg-gray-50"
                        >
                            {job}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const cvContent = (
        <div>
            <div className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
                Công cụ tạo CV
            </div>
            <div className="mb-4 text-sm text-gray-600">
                Tạo CV chuyên nghiệp trong vài phút
            </div>
            <div className="space-y-2">
                {[
                    "Mẫu CV đẹp",
                    "Tạo CV online",
                    "CV theo ngành nghề",
                    "Kiểm tra CV",
                    "Dịch vụ viết CV",
                    "CV Builder AI",
                ].map((item, index) => (
                    <div
                        key={index}
                        className="p-2 text-sm rounded cursor-pointer hover:bg-gray-50"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );

    const toolsContent = (
        <div>
            <div className="mb-3 text-xs font-medium tracking-wide text-gray-500 uppercase">
                Công cụ hỗ trợ
            </div>
            <div className="space-y-2">
                {[
                    "Tính lương Gross - Net",
                    "Tính bảo hiểm thất nghiệp",
                    "Tra cứu mã số thuế",
                    "Tính thuế TNCN",
                    "Quy đổi lương",
                ].map((item, index) => (
                    <div
                        key={index}
                        className="p-2 text-sm rounded cursor-pointer hover:bg-gray-50"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );

    const guideContent = (
        <div>
            <div className="mb-4 text-xs font-medium tracking-wide text-gray-500 uppercase">
                Bài viết nổi bật
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex gap-3">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded"></div>
                    <div>
                        <div className="mb-1 text-sm font-medium">
                            5 mẹo viết CV gây ấn tượng
                        </div>
                        <div className="text-xs text-gray-600">
                            Hướng dẫn chi tiết cách viết CV thu hút nhà tuyển
                            dụng
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded"></div>
                    <div>
                        <div className="mb-1 text-sm font-medium">
                            Cách tìm việc hiệu quả 2024
                        </div>
                        <div className="text-xs text-gray-600">
                            Chiến lược tìm việc thành công trong thị trường việc
                            làm hiện tại
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                Xem tất cả bài viết
            </div>
        </div>
    );

    const premiumContent = (
        <div>
            <div className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
                TopCV Pro
            </div>
            <div className="mb-4 text-sm text-gray-600">
                Nâng cấp tài khoản để sử dụng các tính năng cao cấp
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">CV Pro Template</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Thống kê CV</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Xem NTD đã xem CV</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Ưu tiên hiển thị</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                    <Headphones className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Hỗ trợ ưu tiên</span>
                </div>
            </div>
        </div>
    );

    const dropdownContent = {
        jobs: jobsContent,
        cv: cvContent,
        tools: toolsContent,
        guide: guideContent,
        premium: premiumContent,
    };

    // tách 2 chữ cái đầu từ tên user để hiển thị nếu k có avt
    const getUserInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <header className="h-18 bg-[#0a66c2] relative">
            <div className="flex items-center h-full px-4">
                {/* Logo */}
                <Link href="/">
                    <div className="flex-shrink-0">
                        <Image
                            src={logo}
                            alt="JobHuntly Logo"
                            width={120}
                            height={40}
                            className="w-auto h-10"
                        />
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="flex justify-between w-full ml-8">
                    {/* Left Navigation */}
                    <div className="relative" onMouseLeave={handleMouseLeave}>
                        <ul className="flex items-center space-x-1">
                            {[
                                { key: "jobs", label: "Việc làm" },
                                { key: "cv", label: "Tạo CV" },
                                { key: "tools", label: "Công cụ" },
                                { key: "guide", label: "Cẩm nang nghề nghiệp" },
                                { key: "premium", label: "TopCV" },
                            ].map((item) => (
                                <li key={item.key}>
                                    <div
                                        className="group flex items-center gap-1 text-white font-medium px-3 py-2 rounded-lg cursor-pointer hover:bg-[#d0e5f9] hover:text-[#0a66c2] transition-colors"
                                        onMouseEnter={() =>
                                            handleMouseEnter(item.key)
                                        }
                                    >
                                        <span>{item.label}</span>
                                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Dropdown Menu */}
                        {activeDropdown && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg min-w-[592px] p-5 z-50">
                                <div className="absolute left-0 w-full h-3 -top-3"></div>
                                {dropdownContent[activeDropdown]}
                            </div>
                        )}
                    </div>

                    {/* Right Navigation */}
                    <ul className="flex items-center space-x-2">
                        {!isLoggedIn ? (
                            <>
                                {/* Khi chưa đăng nhập */}

                                <li>
                                    <Button
                                        variant="secondary"
                                        className="bg-[#d6eaff] text-[#0a66c2] hover:bg-[#b6dbfb] font-semibold"
                                        onClick={handleRegisterClick}
                                        disabled={isAuthLoading}
                                    >
                                        Đăng ký
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        variant="outline"
                                        className="text-white bg-transparent border-white hover:bg-white/20 hover:text-white"
                                        onClick={handleLoginClick}
                                        disabled={isAuthLoading}
                                    >
                                        {isAuthLoading
                                            ? "Đang xử lý..."
                                            : "Đăng nhập"}
                                    </Button>
                                </li>
                                <li>
                                    <Button className="bg-[#ff8a00] hover:bg-[#e67600] text-white">
                                        Đăng tuyển & tìm hồ sơ
                                    </Button>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Khi đã đăng nhập */}
                                <li>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative text-white hover:bg-white/20"
                                    >
                                        <Bell className="h-5 w-5" />
                                        {notificationCount > 0 && (
                                            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                                                {notificationCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </li>

                                {/* Profile Dropdown */}
                                <li>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="flex items-center space-x-2 text-white hover:bg-white/20 p-2"
                                            >
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src="/placeholder.svg?height=32&width=32"
                                                        alt="User Avatar"
                                                    />
                                                    <AvatarFallback className="bg-white text-[#0a66c2] text-sm font-semibold">
                                                        {getUserInitials(
                                                            user?.fullname,
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="hidden md:block text-sm font-medium">
                                                    {user?.fullname || "User"}
                                                </span>
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-56"
                                            align="end"
                                        >
                                            <DropdownMenuLabel>
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium">
                                                        {user?.name ||
                                                            user?.fullname ||
                                                            "User"}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {user?.email ||
                                                            "user@example.com"}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={handleProfileClick}
                                            >
                                                <User className="mr-2 h-4 w-4" />

                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <FileText className="mr-2 h-4 w-4" />
                                                <span>Manage CV</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Briefcase className="mr-2 h-4 w-4" />
                                                <span>My Jobs</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Heart className="mr-2 h-4 w-4" />
                                                <span>Saved Jobs</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Bell className="mr-2 h-4 w-4" />
                                                <span>Notifications</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="cursor-pointer text-red-600 focus:text-red-600"
                                                onClick={handleLogout}
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Logout</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>

                                {/* khi nào check role recruiter thì hiện */}
                                {/*<li>*/}
                                {/*    <Button className="bg-[#ff8a00] hover:bg-[#e67600] text-white">*/}
                                {/*        Đăng tuyển*/}
                                {/*    </Button>*/}
                                {/*</li>*/}
                            </>
                        )}

                        {/* Language Switcher - Always visible */}
                        <li className="flex items-center text-sm text-white/80">
                            <button className="px-2 py-1 rounded hover:bg-white/20 hover:text-white">
                                EN
                            </button>
                            <span className="mx-1">|</span>
                            <button className="px-2 py-1 font-semibold text-white rounded bg-white/20">
                                VI
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
