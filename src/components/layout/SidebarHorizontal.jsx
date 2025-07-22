"use client"
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function SidebarHorizontal({ tabs }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-4 border-b border-gray-300 mb-6">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <button
            key={tab.href}
            onClick={() => router.push(tab.href)}
            className={clsx(
              "py-2 px-4 border-b-2 transition-all",
              active
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-blue-600",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
