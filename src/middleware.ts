/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode"; // ✅ Use `jwt-decode` instead of `jsonwebtoken/decode`
import { parse } from "cookie";

const authRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const accessToken = cookies.accessToken;

  // ✅ 1. If not logged in
  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `/sign-in?redirect=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }
  }

  let decodedToken: any;

  try {
    decodedToken = jwtDecode(accessToken);
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const role = decodedToken?.role;
  const userId = decodedToken?.userId;
  const isProfileCompleted = decodedToken?.isProfileCompleted;

  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ 3. Protect add-property route
  if (pathname === "/listing/add-property") {
    if (role !== "landlord") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (!isProfileCompleted) {
      return NextResponse.redirect(
        new URL(`/profile/edit/${userId}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/listing/:path*",
    // Add more protected routes here
  ],
};
