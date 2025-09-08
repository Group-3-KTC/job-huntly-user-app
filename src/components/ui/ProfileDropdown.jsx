"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    LayoutDashboard,
    User,
    FileText,
    Briefcase,
    Heart,
    Bell,
    Settings,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileDropdown({ user, onLogout, getUserInitials }) {
    const router = useRouter();

    // config cho các menu item -> dễ custom về sau
    const menuItems = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            onClick: () => router.push("/dashboard"),
        },
        {
            label: "Profile",
            icon: User,
            onClick: () => router.push("/profile"),
        },
        {
            label: "Manage CV",
            icon: FileText,
            onClick: () => router.push("/ManageCv"),
        },
        {
            label: "My Jobs",
            icon: Briefcase,
            onClick: () => router.push("/jobs"),
        },
        {
            label: "Saved Jobs",
            icon: Heart,
            onClick: () => router.push("/jobs/saved"),
        },
        {
            label: "Notifications",
            icon: Bell,
            onClick: () => router.push("/notifications"),
        },
        {
            label: "Settings",
            icon: Settings,
            onClick: () => router.push("/settings"),
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center py-6 text-white hover:bg-white/20"
                >
                    <Avatar>
                        <AvatarImage
                            src={
                                user?.avatar ||
                                "/placeholder.svg?height=32&width=32"
                            }
                            alt="User Avatar"
                        />
                        <AvatarFallback className="bg-white text-[#0a66c2] text-sm font-semibold">
                            {getUserInitials(user?.fullName)}
                        </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-2 h-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-4">
                        <p className="text-lg font-medium ">
                            {user?.name || user?.fullName || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                            {user?.email || "user@example.com"}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {menuItems.map((item, i) => (
                    <DropdownMenuItem
                        key={i}
                        className="cursor-pointer"
                        onClick={item.onClick}
                    >
                        <item.icon className="w-4 h-4 mr-2" />
                        <span>{item.label}</span>
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="text-red-600 cursor-pointer focus:text-red-600"
                    onClick={onLogout}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
