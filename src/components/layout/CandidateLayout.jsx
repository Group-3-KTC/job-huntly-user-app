import CandidateSidebar from "@/components/layout/CandidateSidebar";

export default function CandidateLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="min-w-[280px] border-r">
        <CandidateSidebar />
      </aside>
      <main className="flex-1 px-6">{children}</main>
    </div>
  );
}
