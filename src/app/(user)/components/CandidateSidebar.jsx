"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  FileText,
  Mail,
  Bell,
  Settings,
  LayoutDashboard,
  Briefcase,
} from "lucide-react";


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
    href: "/profile/manage-cv",
    label: "Manage CV",
    icon: <FileText className="w-5 h-5 mr-2" />,
  },
  {
    href: "/jobInvitation",
    label: "Job Invitations",
    icon: <Mail className="w-5 h-5 mr-2" />,
  },
  {
    href: "/jobs",
    label: "My Jobs",
    icon: <Briefcase className="w-5 h-5 mr-2" />,
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: <Bell className="w-5 h-5 mr-2" />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5 mr-2" />,
  },
];

export default function CandidateSidebar() {
  const pathname = usePathname();

  return (
      <aside className="hidden w-full mr-6 lg:block ">
          <div className="p-4 bg-white shadow-md rounded-xl">
              <div className="">
                  <div className="flex flex-row items-center my-2">
                      <div className="flex flex-col ml-2">
                          <p className="text-sm font-medium text-blue-800">Welcome</p>
                          <h3 className="text-2xl font-bold text-gray-900">
                              Hoang Phuc Vo
                          </h3>
                      </div>
                  </div>
              </div>
              <ul className="space-y-2 text-base font-medium">
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
