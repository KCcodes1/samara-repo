import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/siteUrl';
export const runtime = 'nodejs';

export async function GET() {
  const siteUrl = getSiteUrl();
  return NextResponse.json({
    siteUrl,
    https: siteUrl.startsWith('https://'),
    hint: 'siteUrl must be https://www.samarahomes.co.ke'
  });
}