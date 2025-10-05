import { cookies } from "next/headers";
import { getSiteUrl } from "@/lib/siteUrl";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;

function randomState(len = 24) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export async function GET() {
  if (!GITHUB_CLIENT_ID) {
    return new Response("Missing GITHUB_CLIENT_ID", { status: 500 });
  }

  const SITE_URL = getSiteUrl();
  const state = randomState();

  const cookieStore = cookies();
  cookieStore.set("decap_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: SITE_URL.startsWith("https://"), // secure in prod
    path: "/",
    maxAge: 10 * 60, // 10min
  });

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    scope: "repo", // or "public_repo" if only public repos
    state,
    redirect_uri: `${SITE_URL}/api/decap/callback`,
    allow_signup: "true",
  });

  return Response.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`, 302);
}