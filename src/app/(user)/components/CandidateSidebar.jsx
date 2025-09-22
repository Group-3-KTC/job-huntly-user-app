"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    User,
    FileText,
    Building2,
    Bell,
    Settings,
    LayoutDashboard,
    Briefcase,
    CalendarRange,
} from "lucide-react";
import { selectAuthUser } from "@/features/auth/authSelectors";
import { useDispatch, useSelector } from "react-redux";
import {
    selectPersonalDetail,
    setPersonalDetail,
} from "@/features/profile/personalDetailSlice";
import { useGetCombinedProfileQuery } from "@/services/profileService";
import { normalizeProfileData } from "@/features/profile/normalizeProfileData";
import { useEffect } from "react";

const navItems = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
    },
    {
        href: "/profile",
        label: "Profile",
        icon: <User className="w-5 h-5 mr-2" />,
    },
    {
        href: "/ManageCv",
        label: "Manage CV",
        icon: <CalendarRange className="w-5 h-5 mr-2" />,
    },
    {
        href: "/Interviews",
        label: "My Interviews",
        icon: <FileText className="w-5 h-5 mr-2" />,
    },
    {
        href: "/companyFollows",
        label: "Company Follows",
        icon: <Building2 className="w-5 h-5 mr-2" />,
    },
    {
        href: "/jobs",
        label: "My Jobs",
        icon: <Briefcase className="w-5 h-5 mr-2" />,
    },
    {
        href: "/settings",
        label: "Settings",
        icon: <Settings className="w-5 h-5 mr-2" />,
    },
];

export default function CandidateSidebar() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const personalDetail = useSelector(selectPersonalDetail);

    const { data, isSuccess } = useGetCombinedProfileQuery();

    useEffect(() => {
        if (isSuccess && data) {
            const normalized = normalizeProfileData(data);
            dispatch(setPersonalDetail(normalized.personalDetail));
        }
    }, [isSuccess, data, dispatch]);

    return (
        <aside className="hidden w-full mr-6 lg:block ">
            <div className="bg-white shadow-md rounded-xl ">
                <div className="p-4 overflow-hidden border-b-2 border-blue">
                    <div className="flex flex-row items-center my-2 ">
                        <div className="flex flex-col ml-2">
                            <p className="text-sm font-medium text-blue-800">
                                Welcome
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {personalDetail?.fullName}
                            </h3>
                        </div>
                    </div>
                </div>
                <ul className="p-4 space-y-2 text-base font-medium">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-2 py-3 rounded cursor-pointer hover:bg-blue-600 hover:text-white ${
                                        isActive ? "bg-blue-600 text-white" : ""
                                    }`}
                                    prefetch={false}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
