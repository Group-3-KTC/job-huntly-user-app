import "@/styles/globals.css";
import ClientRootLayout from "./ClientRootLayout";
import Script from "next/script";

export const metadata = {
    title: "Job Huntly",
    description:
        "JobHuntly is a smart recruitment platform that connects employers and candidates quickly. Find suitable jobs, manage profiles, track interview invitations, and receive daily job alerts. Simple – Fast – Effective.",
    icons: {
        icon: "/logo.svg",
    },
    robots: { index: true, follow: true },
    openGraph: {
        title: "Job Huntly",
        description:
            "JobHuntly is a smart recruitment platform that connects employers and candidates quickly. Find suitable jobs, manage profiles, track interview invitations, and receive daily job alerts. Simple – Fast – Effective.",
        url: "https://jobhuntly.io.vn/",
        siteName: "Job Huntly",
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://jobhuntly.io.vn/",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
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
