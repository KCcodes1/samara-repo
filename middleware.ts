import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow admin and OAuth paths through untouched
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/decap/auth") ||
    pathname.startsWith("/api/decap/callback")
  ) {
    return NextResponse.next();
  }

  // ... your existing logic here ...

  return NextResponse.next();
}

// Ensure matcher doesn't unnecessarily capture static/CMS files
export const config = {
  matcher: ["/((?!_next|static|favicon.ico|robots.txt|sitemap.xml).*)"],
};
