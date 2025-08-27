import "@/styles/globals.css";
import ClientRootLayout from "./ClientRootLayout";
import Script from "next/script";

export const metadata = {
    title: "Job Huntly",
    description:
        "JobHuntly là nền tảng tuyển dụng thông minh giúp kết nối nhà tuyển dụng và ứng viên nhanh chóng. Tìm việc làm phù hợp, quản lý hồ sơ, theo dõi lời mời phỏng vấn và nhận thông báo việc làm mới mỗi ngày. Đơn giản – Nhanh chóng – Hiệu quả.",
    icons: {
        icon: "/logo.svg",
    },
    robots: { index: true, follow: true },
    openGraph: {
        title: "Job Huntly",
        description:
            "JobHuntly là nền tảng tuyển dụng thông minh giúp kết nối nhà tuyển dụng và ứng viên nhanh chóng. Tìm việc làm phù hợp, quản lý hồ sơ, theo dõi lời mời phỏng vấn và nhận thông báo việc làm mới mỗi ngày. Đơn giản – Nhanh chóng – Hiệu quả.",
        url: "https://your-website.com", // thay thế sau khi deploy
        siteName: "Job Huntly",
        locale: "vi_VN",
        type: "website",
    },
    alternates: {
        canonical: "https://your-website.com", // thay thế sau khi deploy
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            <body data-scrolling-animations="true">
                <div className="sp-body">
                    <ClientRootLayout>{children}</ClientRootLayout>
                </div>
                <Script
                    src="https://accounts.google.com/gsi/client"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
