import {
    LayoutDashboard,
    User,
    FileText,
    Briefcase,
    Heart,
    Bell,
    Settings,
    Building2,
} from "lucide-react";

export const menuItems = (router) => [
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
        label: "Companies Follow",
        icon: Building2,
        onClick: () => router.push("/companyFollows"),
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
        label: "Settings",
        icon: Settings,
        onClick: () => router.push("/settings"),
    },
];
