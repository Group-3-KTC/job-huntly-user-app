import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ClientLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen text-gray-900 bg-gray-100">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>
            <main className="flex-grow min-w-full py-6 mx-auto mt-18">
                {children}
            </main>
            <Footer />
        </div>
    );
}
