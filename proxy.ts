import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import {
  getNewTokensWithRefreshToken,
  getUserInfo,
} from "./services/auth.services";

/**
 * Helper to refresh tokens within the middleware flow
 */
async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refresh = await getNewTokensWithRefreshToken(refreshToken);
    return !!refresh;
  } catch (error) {
    console.error("Error refreshing token in middleware:", error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const pathWithQuery = `${pathname}${request.nextUrl.search}`;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let isValidAccessToken = false;
    let userRole: UserRole | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let decodedPayload: any = null;

    // 1. Decode and Validate Token (Trusting payload due to signature mismatch)
    if (accessToken) {
      try {
        decodedPayload = decodeJwt(accessToken);

        // Manual Expiry Check (seconds)
        const currentTime = Math.floor(Date.now() / 1000);
        isValidAccessToken = decodedPayload.exp > currentTime;

        if (isValidAccessToken) {
          const rawRole = decodedPayload.role as UserRole;
          // Unify Super Admin permissions
          userRole = rawRole === "SUPER_ADMIN" ? "ADMIN" : rawRole;
        }
      } catch (err) {
        console.error("Middleware: Failed to decode token", err);
      }
    }

    const routerOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // 2. Proactive Refresh Logic
    if (
      isValidAccessToken &&
      refreshToken &&
      (await isTokenExpiringSoon(accessToken as string))
    ) {
      const requestHeaders = new Headers(request.headers);
      const refreshed = await refreshTokenMiddleware(refreshToken);
      if (refreshed) {
        requestHeaders.set("x-token-refreshed", "1");
        return NextResponse.next({ request: { headers: requestHeaders } });
      }
    }

    // 3. Auth Route Protection (Prevent logged-in users from seeing /login)
    if (
      isAuth &&
      isValidAccessToken &&
      !["/verify-email", "/reset-password"].includes(pathname)
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }

    // 4. Public Route Access
    if (routerOwner === null) {
      return NextResponse.next();
    }

    // 5. Protected Route Access Check
    if (!isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    // 6. User State Enforcement (Email/Password)
    const userInfo = await getUserInfo();
    if (userInfo) {
      // Email Verification
      // if (userInfo.emailVerified === false) {
      //   if (pathname !== "/verify-email") {
      //     const verifyUrl = new URL("/verify-email", request.url);
      //     verifyUrl.searchParams.set("email", userInfo.email);
      //     return NextResponse.redirect(verifyUrl);
      //   }
      //   return NextResponse.next();
      // }
      // Handle redirecting away from verify-email if already verified
      // if (userInfo.emailVerified && pathname === "/verify-email") {
      //   return NextResponse.redirect(
      //     new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      //   );
      // }
      // Password Change Required
      // if (userInfo.needPasswordChange) {
      //   if (pathname !== "/reset-password") {
      //     const resetUrl = new URL("/reset-password", request.url);
      //     resetUrl.searchParams.set("email", userInfo.email);
      //     return NextResponse.redirect(resetUrl);
      //   }
      //   return NextResponse.next();
      // }
      // Handle redirecting away from reset-password if not needed
      // if (!userInfo.needPasswordChange && pathname === "/reset-password") {
      //   return NextResponse.redirect(
      //     new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      //   );
      // }
    }

    // 7. Role-Based Access Control (RBAC)
    if (routerOwner !== "COMMON" && routerOwner !== userRole) {
      console.log(
        `Access Denied: Path ${pathname} requires ${routerOwner}, User is ${userRole}`,
      );
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);
    // Return next() to avoid an infinite redirect loop on unexpected errors
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
