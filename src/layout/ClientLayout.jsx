import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeaderRecruiter } from "@/components/layout/HeaderRecruiter";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/authSlice";

export default function ClientLayout({ children }) {
    const user = useSelector(selectUser);
    const role = user?.role;

    const renderHeader = () => {
        if (role === "recruiter") return <HeaderRecruiter />;
        return <Header />;
    };
    return (
        <div className="flex flex-col min-h-screen text-gray-900 bg-gray-100">
            <div className="fixed top-0 left-0 right-0 z-50">
                {renderHeader()}
            </div>
            <main className="flex-grow min-w-full mt-18 py-6 mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
}
