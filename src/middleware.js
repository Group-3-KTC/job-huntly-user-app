import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const routeConfig = {
    candidate: [
        /^\/profile/,
        /^\/dashboard/,
        /^\/applications/,
        /^\/settings/,
        /^\/jobs/,
        /^\/saved-jobs/,
    ],
    recruiter: [
        /^\/recruiters(\/|$)/,
        /^\/recruiter-dashboard/,
        /^\/post-job/,
        /^\/manage-jobs/,
    ],
};

// public routes không cần đăng nhập
const publicRoutes = [
    /^\/$/,
    /^\/login$/,
    /^\/register$/,
    /^\/about$/,
    /^\/contact$/,
    /^\/forgot-password$/,
    /^\/search$/,
    /^\/company\/company-search$/,
    /^\/job-detail\/[^\/]+$/,
];

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    console.log("middleware checking path:", pathname);

    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    if (publicRoutes.some((regex) => regex.test(pathname))) {
        return NextResponse.next();
    }

    const authToken = req.cookies.get("authToken")?.value;
    const authUser = req.cookies.get("authUser")?.value;

    if (!authToken || !authUser) {
        return redirectToLogin(req);
    }

    try {
        const decoded = await verifyToken(authToken);
        const role = decoded.role;

        const allowedRoutes = routeConfig[role] || [];
        const hasAccess = allowedRoutes.some((routeRegex) =>
            routeRegex.test(pathname),
        );

        if (!hasAccess) {
            console.log("Access denied to", pathname, "- redirecting...");
            const fallback = role === "recruiter" ? "/recruiters" : "/profile";
            return NextResponse.redirect(new URL(fallback, req.url));
        }

        // if (role === "recruiter" && pathname.startsWith("/(user)")) {
        //     return NextResponse.redirect(new URL("/recruiters", req.url));
        // }
        //
        // if (role === "candidate" && pathname.startsWith("/recruiters")) {
        //     return NextResponse.redirect(new URL("/", req.url));
        // }
        return NextResponse.next();
    } catch (error) {
        console.log("Invalid or expired token:", error.message);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

function redirectToLogin(req) {
    return NextResponse.redirect(new URL("/login", req.url));
}

function clearAuthAndRedirect(req) {
    const response = redirectToLogin(req);
    response.cookies.delete("authToken");
    response.cookies.delete("authUser");
    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
        "/applicationJob",
        "/(user)/:path*",
        "/recruiters/:path*",
    ],
};
