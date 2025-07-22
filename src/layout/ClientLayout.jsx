import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ClientLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 bg-gray-100">
      <Header />
      <main className="flex-grow min-w-full py-6 mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
