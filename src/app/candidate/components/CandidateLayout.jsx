import CandidateSidebar from "@/app/candidate/components/CandidateSidebar";

export default function CandidateLayout({ children }) {
  return (
    <div className="flex min-h-screen mx-auto max-w-7xl">
      <aside className="w-[280px] shrink-0 hidden lg:block">
        <CandidateSidebar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
