import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api/decap/')
  ) {
    return NextResponse.next();
  }

  // ...your existing rules...

  return NextResponse.next();
}

// If you use a matcher, ensure these paths aren't captured
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};