import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow CMS admin and OAuth endpoints to pass through
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/decap/auth") ||
    pathname.startsWith("/api/decap/callback")
  ) {
    return NextResponse.next();
  }

  // ... your existing logic ...

  return NextResponse.next();
}

// If you use a matcher, ensure it doesn't capture /admin or the api paths above
export const config = {
  matcher: ["/((?!_next|static|favicon.ico|robots.txt|sitemap.xml).*)"],
};
