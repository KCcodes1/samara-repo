import { cookies } from "next/headers";
import { getSiteUrl } from "@/lib/siteUrl";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

function html(body: string, status = 200) {
  return new Response(body, { status, headers: { "content-type": "text/html; charset=utf-8" } });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");

  const cookieStore = cookies();
  const stateCookie = cookieStore.get("decap_oauth_state")?.value;

  if (!code) return html("<p>Missing OAuth code</p>", 400);
  if (!returnedState || !stateCookie || returnedState !== stateCookie) {
    return html("<p>Invalid state</p>", 400);
  }
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return html("<p>Missing GitHub credentials</p>", 500);
  }

  const SITE_URL = getSiteUrl();

  // Exchange code for token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${SITE_URL}/api/decap/callback`,
    }),
  });

  const data = await tokenRes.json() as { access_token?: string; error?: string; error_description?: string };
  const token = data.access_token;
  if (!token) {
    const msg = data.error_description || data.error || "No access token";
    return html(`<!doctype html><p>OAuth failed.</p><pre>${msg}</pre>`, 500);
  }

  // Decap expects string messages:
  //  - "authorizing:github"
  //  - "authorization:github:success:<payload>"  (payload can be JSON with token)
  const page = `<!doctype html><html><body>
<script>
(function (t) {
  try {
    if (window.opener) {
      window.opener.postMessage("authorizing:github", "*");
      window.opener.postMessage("authorization:github:success:" + JSON.stringify({ token: t }), "*");
    } else {
      window.location.href = "/admin";
      return;
    }
  } finally {
    setTimeout(function () {
      try { window.close(); } catch (e) { window.location.href = "/admin"; }
    }, 500);
  }
})(${JSON.stringify(token)});
</script>
<p>Authentication successful. You can close this window.</p>
</body></html>`;

  const res = html(page);
  // clear state cookie with matching attributes
  const secure = SITE_URL.startsWith("https://");
  res.headers.append("set-cookie", `decap_oauth_state=; Max-Age=0; Path=/; SameSite=Lax;${secure ? " Secure;" : ""}`);
  return res;
}