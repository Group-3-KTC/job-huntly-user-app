import CandidateSidebar from "@/app/candidate/components/CandidateSidebar";

export default function CandidateLayout({ children }) {
  return (
    <div className="flex min-h-screen mx-auto max-w-7xl">
      <aside className="w-[280px] shrink-0 hidden sticky top-24 h-fit max-h-[calc(100vh-2rem)] lg:block">
        <CandidateSidebar />
      </aside>
      <main className="flex-1 min-h-screen px-6">{children}</main>
    </div>
  );
}
