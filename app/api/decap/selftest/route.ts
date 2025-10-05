import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/siteUrl';

export const runtime = 'nodejs';

export async function GET() {
  const siteUrl = getSiteUrl();
  return NextResponse.json({
    siteUrl,
    https: siteUrl.startsWith('https://'),
    hint: 'If siteUrl is not https://samarahomes.co.ke fix NEXT_PUBLIC_SITE_URL in Vercel → Project → Settings → Environment Variables (Production).'
  });
}
