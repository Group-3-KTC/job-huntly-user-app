import SidebarHorizontal from "@/components/layout/SidebarHorizontal";

export default function JobInvitationLayout({ children }) {
  const tabs = [
    { label: "Đã nhận", href: "/candidate/jobInvitation/received" },
    { label: "Phỏng vấn", href: "/candidate/jobInvitation/interview" },
    { label: "Đã lưu trữ", href: "/candidate/jobInvitation/archived" },
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <SidebarHorizontal tabs={tabs} />
      {children}
    </div>
  );
}
