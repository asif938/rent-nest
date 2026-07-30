import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/properties",
];

const TENANT_PREFIX = "/dashboard/tenant";
const LANDLORD_PREFIX = "/dashboard/landlord";
const ADMIN_PREFIX = "/dashboard/admin";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  const isPublic =
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith("/properties/");

  if (isPublic && !accessToken) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload & {
      role: string;
    };

    const role = decoded.role;

    if (
      pathname === "/login" ||
      pathname === "/register"
    ) {
      switch (role) {
        case "TENANT":
          return NextResponse.redirect(
            new URL("/dashboard/tenant", request.url)
          );

        case "LANDLORD":
          return NextResponse.redirect(
            new URL("/dashboard/landlord", request.url)
          );

        case "ADMIN":
          return NextResponse.redirect(
            new URL("/dashboard/admin", request.url)
          );
      }
    }

    if (
      pathname.startsWith(TENANT_PREFIX) &&
      role !== "TENANT"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      pathname.startsWith(LANDLORD_PREFIX) &&
      role !== "LANDLORD"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      pathname.startsWith(ADMIN_PREFIX) &&
      role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    response.cookies.delete("accessToken");

    return response;
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",

    "/dashboard/:path*",

    "/properties/:path*",
  ],
};