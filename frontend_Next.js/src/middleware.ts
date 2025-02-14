import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  adminRoutes,
  authRoutes,
  DEFAULT_SIGNIN_REDIRECT,
  publicRoutes,
} from "./route";

export function middleware(req: NextRequest) {
  // Get the token (if present)
  const token = req.cookies.get("user_token")?.value;
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // If the route is public and there's no token, allow access.
  if (!token && publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If token exists and the user is trying to access an auth route, redirect to DEFAULT_LOGIN_REDIRECT
  if (token && authRoutes.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = DEFAULT_SIGNIN_REDIRECT;
    return NextResponse.redirect(url);
  }

  // If token does not exist and the user is trying to access any route that is not an auth route,
  // redirect to the signin page, preserving the callback URL (including search params).
  if (!token && !authRoutes.includes(pathname)) {
    const url = req.nextUrl.clone();
    // Optionally preserve callback URL:
    const callbackUrl = encodeURIComponent(pathname + (nextUrl.search || ""));
    url.pathname = "/auth/signin";
    url.search = `?callbackUrl=${callbackUrl}`;
    return NextResponse.redirect(url);
  }

  // if (adminRoute.includes(pathname) && user?.role !== "ADMIN") {
  //   return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
