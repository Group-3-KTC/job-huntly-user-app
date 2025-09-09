import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import LoginPromptModal from "@/app/job-detail/[id]/_components/LoginPromptModal";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { hideLoginPrompt } from "@/features/auth/loginPromptSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ClientLayout({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();
   const { open } = useSelector((state) => state.loginPrompt); 

   const openLogin = useCallback(() => {
       dispatch(hideLoginPrompt());
       router.push("/login");
   }, [dispatch, router]);
    return (
        <div className="flex flex-col min-h-screen text-gray-900 bg-gray-100">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>
            <main className="flex-grow min-w-full py-6 mx-auto mt-18">
            <LoginPromptModal
                open={open}
                onClose={() => dispatch(hideLoginPrompt())}
                onLogin={openLogin}
            />
                {children}
            </main>
            <Footer />
        </div>
    );
}
