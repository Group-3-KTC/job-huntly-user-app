import SidebarHorizontal from "@/components/layout/SidebarHorizontal";

export default function JobsLayout({ children }) {
  const tabs = [
    { label: "Đã ứng tuyển", href: "/candidate/jobs/applied" },
    { label: "Đã lưu", href: "/candidate/jobs/saved" },
    { label: "Danh sách", href: "/candidate/jobs/list" },
  ];

  return (
    <div className="p-6 bg-white shadow rounded">
      <SidebarHorizontal tabs={tabs} />
      {children}
    </div>
  );
}