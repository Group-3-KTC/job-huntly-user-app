import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const routeConfig = {
    candidate: [
        /^\/profile/,
        /^\/dashboard/,
        /^\/job-invitation/,
        /^\/notifications/,
        /^\/saved-jobs/, // Loại duplicate
        /^\/companyFollows/,
        /^\/jobs(\/|$)/,
        /^\/applications/,
        /^\/settings/,
    ],
    recruiter: [
        /^\/recruiter(\/.*)?$/, // Mở rộng để bao quát tất cả sub-routes recruiter
        /^\/recruiter-dashboard/, // Giữ nếu cần specific
        /^\/recruiter\/create-job/,
        /^\/company-profile/,
        /^\/manage-jobs/,
    ],
};

const publicRoutes = [
    /^\/login$/,
    /^\/register$/,
    /^\/about$/,
    /^\/contact$/,
    /^\/forgot-password$/,
    /^\/search$/,
    /^\/company\/company-detail\/[^/]+/,
    /^\/company\/company-search$/,
    /^\/company\/company-search\/results/, // Thêm route kết quả tìm kiếm công ty
    /^\/job-detail\/[^\/]+$/,
];

const redirectPublicRoutes = [
    /^\/$/, // Home xử lý riêng để phân biệt role
];

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    console.log(
        "Middleware checking path:",
        pathname,
        "at",
        new Date().toISOString()
    );

    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        console.log("Skipping static or API route");
        return NextResponse.next();
    }

    const authToken = req.cookies.get("authToken")?.value;
    const authUser = req.cookies.get("authUser")?.value;

    console.log("Token and user:", {
        authToken: !!authToken,
        authUser: !!authUser,
    });

    if (publicRoutes.some((regex) => regex.test(pathname))) {
        console.log("Public route detected, allowing access");
        return NextResponse.next();
    }

    if (redirectPublicRoutes.some((regex) => regex.test(pathname))) {
        if (authToken && authUser) {
            try {
                const decoded = await verifyToken(authToken);
                const role = decoded.role;
                console.log("Authenticated user on home, role:", role);
                if (role === "recruiter") {
                    return NextResponse.redirect(
                        new URL("/recruiter/dashboard", req.url)
                    );
                }
                // Cho candidate: Allow access to home khi auth
                console.log("Candidate on home, allowing access");
                return NextResponse.next();
            } catch (error) {
                return clearAuthAndRedirect(req);
            }
        }
        console.log("Unauthenticated on home, allowing access");
        return NextResponse.next();
    }

    if (!authToken || !authUser) {
        console.log("No token or user, redirecting to login");
        return redirectToLogin(req);
    }

    try {
        const decoded = await verifyToken(authToken);
        const role = decoded.role;
        console.log("Decoded role from token:", role);

        const allowedRoutes = routeConfig[role] || [];
        const hasAccess = allowedRoutes.some((routeRegex) =>
            routeRegex.test(pathname)
        );

        if (!hasAccess) {
            console.log(
                "Access denied to",
                pathname,
                "- redirecting to fallback"
            );
            const fallback = role === "recruiter" ? "/recruiter/dashboard" : "/profile";
            return NextResponse.redirect(new URL(fallback, req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.log("Invalid or expired token error:", error.message);
        return clearAuthAndRedirect(req);
    }
}

function redirectToLogin(req) {
    console.log("Redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
}

function clearAuthAndRedirect(req) {
    console.log("Clearing auth and redirecting to login");
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
        "/recruiter/:path*",
    ],
};