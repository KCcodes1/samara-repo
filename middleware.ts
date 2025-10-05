import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/decap/auth") ||
    pathname.startsWith("/api/decap/callback")
  ) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|robots.txt|sitemap.xml).*)"],
};