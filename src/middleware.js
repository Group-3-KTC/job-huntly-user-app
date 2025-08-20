import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "session"; // cookie httpOnly server set khi login

// public
const publicRoutes = [
    /^\/$/, // Home để public, tránh loop lúc hydrate
    /^\/login$/,
    /^\/register$/,
    /^\/about$/,
    /^\/contact$/,
    /^\/forgot-password$/,
    /^\/search$/,
    /^\/company\/company-search$/,
    /^\/company\/company-detail\/[^/]+$/,
    /^\/job-detail\/[^/]+$/,
];

// need login
const protectedPrefixes = [
    /^\/profile/,
    /^\/dashboard/,
    /^\/job-invitation/,
    /^\/notifications/,
    /^\/saved-jobs/,
    /^\/companyFollows/,
    /^\/jobs(\/|$)/,
    /^\/applications/,
    /^\/settings/,
    /^\/recruiter(\/.*)?$/, // toàn bộ khu recruiter
];

// recruiter only
const recruiterOnly = [
    /^\/recruiter(\/.*)?$/,
    /^\/recruiter-dashboard/,
    /^\/recruiter\/create-job/,
    /^\/company-profile/,
    /^\/manage-jobs/,
];

export function middleware(req) {
    const { pathname } = req.nextUrl;

    if (pathname === "/") {
        const hasSession = !!req.cookies.get(SESSION_COOKIE_NAME)?.value;
        const role = req.cookies.get("role")?.value; // cookie non-httpOnly set lúc login
        if (hasSession && role === "RECRUITER") {
            return NextResponse.redirect(
                new URL("/recruiter/dashboard", req.url),
            );
        }
        return NextResponse.next();
    }

    // Bỏ qua tài nguyên tĩnh & api
    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    if (publicRoutes.some((r) => r.test(pathname))) {
        return NextResponse.next();
    }

    const needAuth = protectedPrefixes.some((r) => r.test(pathname));
    if (!needAuth) return NextResponse.next();

    // Kiểm tra cookie phiên httpOnly (được set ở BE)
    const hasSession = !!req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!hasSession) {
        const url = new URL("/login", req.url);
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
    }

    const role = req.cookies.get("role")?.value;
    const isRecruiterPath = recruiterOnly.some((r) => r.test(pathname));
    if (isRecruiterPath && role && role !== "RECRUITER") {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
