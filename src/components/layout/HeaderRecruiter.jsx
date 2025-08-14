"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import {
    Bell,
    User,
    Settings,
    LogOut,
    Plus,
    Briefcase,
    Users,
    BarChart3,
    Menu,
    ChevronDown,
    Building,
    FileText,
    Calendar,
    MessageSquare,
    Search,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
    selectAuthHydrated,
    selectAuthLoading,
    selectUser,
    selectIsLoggedIn,
} from "@/features/auth/authSlice";

export const HeaderRecruiter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(5);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const router = useRouter();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const loading = useSelector(selectAuthLoading);
    const hydrated = useSelector(selectAuthHydrated);

    const navigationItems = [
        {
            label: "Dashboard",
            href: "/recruiter/dashboard",
            icon: BarChart3,
        },
        {
            label: "Manage Jobs",
            icon: Briefcase,
            hasDropdown: true,
            dropdownItems: [
                {
                    label: "All Job Posts",
                    href: "/recruiter/jobs",
                    icon: FileText,
                },
                {
                    label: "Active Jobs",
                    href: "/recruiter/jobs/active",
                    icon: Briefcase,
                },
                {
                    label: "Draft Jobs",
                    href: "/recruiter/jobs/drafts",
                    icon: FileText,
                },
                {
                    label: "Expired Jobs",
                    href: "/recruiter/jobs/expired",
                    icon: Calendar,
                },
            ],
        },
        {
            label: "Candidates",
            icon: Users,
            hasDropdown: true,
            dropdownItems: [
                {
                    label: "All Applicants",
                    href: "/recruiter/applicants",
                    icon: Users,
                },
                {
                    label: "Shortlisted",
                    href: "/recruiter/applicants/shortlisted",
                    icon: User,
                },
                {
                    label: "Interviewed",
                    href: "/recruiter/applicants/interviewed",
                    icon: MessageSquare,
                },
                {
                    label: "Talent Pool",
                    href: "/recruiter/talent-pool",
                    icon: Search,
                },
            ],
        },
        {
            label: "Analytics",
            href: "/recruiter/analytics",
            icon: BarChart3,
        },
    ];

    const getUserInitials = (name) => {
        if (!name) return "RC";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
            router.push("/");
        }
    };

    if (!hydrated) return null;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-[#0a66c2] backdrop-blur">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/recruiter"
                        className="flex items-center space-x-2"
                    >
                        <Image
                            src="/placeholder.svg?height=40&width=40&text=JH"
                            alt="JobHuntly Logo"
                            width={40}
                            height={40}
                            className="h-8 w-8"
                        />
                        <span className="text-xl font-bold text-white">
                            JobHuntly
                        </span>
                        <Badge variant="secondary" className="text-xs">
                            Recruiter
                        </Badge>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-1">
                        {navigationItems.map((item, index) => (
                            <div key={index} className="relative">
                                {item.hasDropdown ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="flex items-center gap-1 text-sm text-white hover:bg-[#0855a1]"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.label}
                                                <ChevronDown className="h-3 w-3" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-48"
                                            align="start"
                                        >
                                            {item.dropdownItems.map(
                                                (dropdown, i) => (
                                                    <DropdownMenuItem
                                                        key={i}
                                                        asChild
                                                    >
                                                        <Link
                                                            href={dropdown.href}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <dropdown.icon className="h-4 w-4" />
                                                            {dropdown.label}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ),
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Link href={item.href}>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-1 text-sm text-white hover:bg-[#0855a1]"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-2">
                        <Link href="/recruiter/create-job">
                            <Button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90">
                                <Plus className="h-4 w-4" />
                                <span>Post a Job</span>
                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative text-white hover:bg-[#0855a1]"
                                >
                                    <Bell className="h-5 w-5" />
                                    {notificationCount > 0 && (
                                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                                            {notificationCount > 9
                                                ? "9+"
                                                : notificationCount}
                                        </Badge>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel>
                                    Notifications
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="max-h-64 overflow-y-auto text-sm text-muted-foreground px-3">
                                    Chưa có thông báo
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/recruiter/notifications"
                                        className="w-full text-center"
                                    >
                                        View All
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2 p-2 text-white hover:bg-[#0855a1]"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=RC" />
                                        <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                                            {getUserInitials(user?.fullName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="hidden lg:flex flex-col items-start">
                                        <span className="text-sm font-medium text-white">
                                            {user?.fullName || "Recruiter"}
                                        </span>
                                        <span className="text-xs text-white/80">
                                            {user?.position || "Tech Recruiter"}
                                        </span>
                                    </div>
                                    <ChevronDown className="h-4 w-4 hidden lg:block" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">
                                            {user?.fullName || "Recruiter"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {user?.email ||
                                                "recruiter@example.com"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {user?.position || "Tech Recruiter"}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/recruiter/profile">
                                        <User className="mr-2 h-4 w-4" />{" "}
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/recruiter/company">
                                        <Building className="mr-2 h-4 w-4" />{" "}
                                        Company
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/recruiter/settings">
                                        <Settings className="mr-2 h-4 w-4" />{" "}
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-600 cursor-pointer"
                                >
                                    <LogOut className="mr-2 h-4 w-4" /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden text-white hover:bg-[#0855a1]"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <SheetHeader className="border-b">
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <div className="p-3 flex flex-col gap-2">
                                    <SheetClose asChild>
                                        <Link href="/recruiter/create-job">
                                            <Button className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90">
                                                <Plus className="h-4 w-4" />
                                                <span>Post a Job</span>
                                            </Button>
                                        </Link>
                                    </SheetClose>

                                    <div className="h-px bg-border my-1" />

                                    {navigationItems.map((item, idx) => (
                                        <div key={idx}>
                                            {item.hasDropdown ? (
                                                <div className="rounded-md border">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveDropdown(
                                                                activeDropdown ===
                                                                    idx
                                                                    ? null
                                                                    : idx,
                                                            )
                                                        }
                                                        className="w-full flex items-center justify-between p-3"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <item.icon className="h-4 w-4" />
                                                            <span className="text-sm font-medium">
                                                                {item.label}
                                                            </span>
                                                        </div>
                                                        <ChevronDown
                                                            className={`h-4 w-4 transition-transform ${
                                                                activeDropdown ===
                                                                idx
                                                                    ? "rotate-180"
                                                                    : ""
                                                            }`}
                                                        />
                                                    </button>
                                                    {activeDropdown === idx && (
                                                        <div className="border-t">
                                                            {item.dropdownItems.map(
                                                                (
                                                                    dropdown,
                                                                    i,
                                                                ) => (
                                                                    <SheetClose
                                                                        asChild
                                                                        key={i}
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                dropdown.href
                                                                            }
                                                                            className="flex items-center gap-2 p-3 text-sm hover:bg-muted"
                                                                        >
                                                                            <dropdown.icon className="h-4 w-4" />
                                                                            {
                                                                                dropdown.label
                                                                            }
                                                                        </Link>
                                                                    </SheetClose>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <SheetClose asChild>
                                                    <Link
                                                        href={item.href}
                                                        className="flex items-center gap-2 p-3 rounded-md hover:bg-muted"
                                                    >
                                                        <item.icon className="h-4 w-4" />
                                                        <span className="text-sm font-medium">
                                                            {item.label}
                                                        </span>
                                                    </Link>
                                                </SheetClose>
                                            )}
                                        </div>
                                    ))}

                                    <div className="h-px bg-border my-1" />

                                    <SheetClose asChild>
                                        <Link
                                            href="/recruiter/notifications"
                                            className="flex items-center gap-2 p-3 rounded-md hover:bg-muted"
                                        >
                                            <Bell className="h-4 w-4" />
                                            <span className="text-sm font-medium">
                                                Notifications
                                            </span>
                                        </Link>
                                    </SheetClose>

                                    <SheetClose asChild>
                                        <Link
                                            href="/recruiter/profile"
                                            className="flex items-center gap-2 p-3 rounded-md hover:bg-muted"
                                        >
                                            <User className="h-4 w-4" />
                                            <span className="text-sm font-medium">
                                                Profile
                                            </span>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/recruiter/company"
                                            className="flex items-center gap-2 p-3 rounded-md hover:bg-muted"
                                        >
                                            <Building className="h-4 w-4" />
                                            <span className="text-sm font-medium">
                                                Company
                                            </span>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/recruiter/settings"
                                            className="flex items-center gap-2 p-3 rounded-md hover:bg-muted"
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span className="text-sm font-medium">
                                                Settings
                                            </span>
                                        </Link>
                                    </SheetClose>

                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            handleLogout();
                                        }}
                                        className="flex items-center gap-2 p-3 rounded-md text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span className="text-sm font-medium">
                                            Logout
                                        </span>
                                    </button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};
