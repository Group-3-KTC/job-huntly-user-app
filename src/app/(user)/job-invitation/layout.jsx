import SidebarHorizontal from "@/components/layout/SidebarHorizontal";

export default function JobInvitationLayout({ children }) {
  const tabs = [
    { label: "Đã nhận", href: "/jobInvitation/received" },
    { label: "Phỏng vấn", href: "/jobInvitation/interview" },
    { label: "Đã lưu trữ", href: "/jobInvitation/archived" },
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <SidebarHorizontal tabs={tabs} />
      {children}
    </div>
  );
}
