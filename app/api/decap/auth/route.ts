import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/siteUrl';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
export const runtime = 'nodejs';

function randomState(n = 24){
  const chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({length:n},()=>chars[Math.floor(Math.random()*chars.length)]).join('');
}

export async function GET() {
  const SITE_URL = getSiteUrl();
  const state = randomState();

  cookies().set({
    name: 'decap_oauth_state',
    value: state,
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secure: SITE_URL.startsWith('https://'),
    // Allow cookie to be valid on apex and www (harmless if you only use apex)
    domain: '.samarahomes.co.ke',
  });

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    scope: 'repo',
    state,
    redirect_uri: `${SITE_URL}/api/decap/callback`,
    allow_signup: 'true',
  });

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}