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
    Bell,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/assets/images/logo-title-white.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import {
    selectAuthHydrated,
    selectAuthLoading,
    selectAuthUser,
    selectIsLoggedIn,
} from "@/features/auth/authSelectors";
import { logoutThunk } from "@/features/auth/authSlice";
import ProfileDropdown from "../ui/ProfileDropdown";
import NotificationBell from "@/components/ui/NotificationBell";

export const Header = () => {
    const dispatch = useDispatch();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);   // mở/đóng overlay
    const [mobilePage, setMobilePage] = useState(null);    // null = trang gốc; 'jobs' | 'cv' | ...
    const [notificationCount, setNotificationCount] = useState(3);
    const router = useRouter();
    const pathname = usePathname();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectAuthUser);
    const isAuthLoading = useSelector(selectAuthLoading);

    const isAuthHydrated = useSelector(selectAuthHydrated);

    const role = (user?.role || "").toUpperCase();

    if (pathname?.startsWith("/recruiter") || role === "RECRUITER") return null;

    if (!isAuthHydrated) return null;

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
        router.push("/profile");
    };
    const handleLogout = async () => {
        try {
            await dispatch(logoutThunk()).unwrap();
            router.push("/");
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
            router.push("/");
        }
    };

    const toggleMobile = () => setMobileOpen((p) => !p);

    const jobsContent = (
        // mobile: dọc 1 khối; md+: 2 khối ngang
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
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
                {/* mobile: 1 cột; md+: 2 cột */}
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
            {/* mobile: 1 cột; md+: 2 cột */}
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
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
                JobHuntly Pro
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

    const navItems = [
        { key: "jobs", label: "Việc làm" },
        { key: "cv", label: "Tạo CV" },
        { key: "tools", label: "Công cụ" },
        { key: "guide", label: "Cẩm nang nghề nghiệp" },
        { key: "premium", label: "JobHuntly" },
    ];

    return (
        <header className="h-18 bg-[#0a66c2] relative">
            <div className="flex items-center h-full px-4">
                {/* BTN menu mobile */}
                <button
                    className="flex items-center justify-center p-2 mr-2 text-white rounded lg:hidden hover:bg-white/20"
                    onClick={toggleMobile}
                >
                    {mobileOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

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

                {/* Navigation desktop */}
                <nav className="justify-between hidden w-full ml-8 lg:flex">
                    {/* Left Navigation */}
                    <div className="relative" onMouseLeave={handleMouseLeave}>
                        <ul className="flex items-center space-x-1">
                            {navItems.map((item) => (
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
                            </>
                        ) : (
                            <>
                                {/* Khi đã đăng nhập */}
                                <li>
                                    <NotificationBell
                                        onClick={() => {
                                            // mở dropdown danh sách hoặc điều hướng tuỳ bạn
                                            // ví dụ:
                                            // router.push("/notifications");
                                        }}
                                    />
                                </li>

                                {/* Profile Dropdown */}
                                <li>
                                    <ProfileDropdown
                                        user={user}
                                        onLogout={handleLogout}
                                        getUserInitials={getUserInitials}
                                    />
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

            {/* OVERLAY MOBILE */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
                    {/* BAR TRÊN CÙNG */}
                    <div className="flex items-center justify-between px-4 border-b h-14">
                        {/* Back hoặc Logo */}
                        {mobilePage ? (
                            <button
                                onClick={() => setMobilePage(null)}
                                className="p-2 -ml-2"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        ) : (
                            <Link href="/" onClick={() => setMobileOpen(false)}>
                                <Image
                                    src={logo}
                                    alt="logo"
                                    height={32}
                                    className="w-auto h-8"
                                />
                            </Link>
                        )}

                        <span className="text-base font-semibold truncate">
                            {navItems.find((i) => i.key === mobilePage)
                                ?.label || ""}
                        </span>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="p-2 -mr-2"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* NỘI DUNG CUỘN */}
                    <div className="flex-1 overflow-y-auto">
                        {/* TRANG GỐC: danh mục */}
                        {!mobilePage && (
                            <ul className="divide-y">
                                {navItems.map((item) => (
                                    <li key={item.key}>
                                        <button
                                            className="w-full flex items-center justify-between px-4 py-4 text-[17px] font-medium"
                                            onClick={() =>
                                                setMobilePage(item.key)
                                            }
                                        >
                                            <span>{item.label}</span>
                                            <ChevronRight className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* TRANG CON: render trực tiếp dropdownContent */}
                        {mobilePage && (
                            <div className="p-4 space-y-4">
                                {dropdownContent[mobilePage]}
                            </div>
                        )}
                    </div>

                    {/* ACTION ĐĂNG NHẬP / ĐĂNG KÝ / ĐĂNG XUẤT – chỉ ở trang gốc */}
                    {!mobilePage && (
                        <div className="p-4 space-y-2 border-t">
                            {!isLoggedIn ? (
                                <>
                                    <button
                                        onClick={handleRegisterClick}
                                        className="block w-full py-3 text-center font-semibold text-[#0a66c2] border border-[#0a66c2] rounded"
                                    >
                                        Đăng ký
                                    </button>
                                    <button
                                        onClick={handleLoginClick}
                                        className="block w-full py-3 text-center font-semibold text-white bg-[#0a66c2] rounded"
                                    >
                                        Đăng nhập
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="block w-full py-3 font-semibold text-center text-red-600 border border-red-600 rounded"
                                >
                                    Đăng xuất
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};
