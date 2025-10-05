import { cookies } from "next/headers";
import { getSiteUrl } from "@/lib/siteUrl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

function html(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
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

  // Exchange code → token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${SITE_URL}/api/decap/callback`,
    }),
    // Don't forward cookies, not needed
  });

  const data = await tokenRes.json() as { access_token?: string; error?: string; error_description?: string };
  const token = data.access_token;
  if (!token) {
    const msg = data.error_description || data.error || "No access token";
    return html(`<!doctype html><p>OAuth failed.</p><pre>${msg}</pre>`, 500);
  }

  // Handshake pattern: ask parent for origin, then reply to that origin.
  const popup = `<!doctype html><html><body>
<script>
(function (t) {
  var acknowledged = false, parentOrigin = "*";

  function onMessage(e) {
    acknowledged = true;
    parentOrigin = e.origin || "*";

    // Canonical Decap messages
    window.opener.postMessage("authorizing:github", parentOrigin);
    window.opener.postMessage("authorization:github:success:" + JSON.stringify({ token: t }), parentOrigin);

    // (Compat) also send without "success" for older listeners
    window.opener.postMessage("authorization:github:" + JSON.stringify({ token: t }), parentOrigin);

    window.removeEventListener("message", onMessage);
    setTimeout(closeOrRedirect, 150);
  }

  function closeOrRedirect() {
    try { window.close(); } catch (e) { window.location.href = "/admin"; }
  }

  if (window.opener) {
    // Request a ping from parent so we get a concrete origin to respond to
    window.addEventListener("message", onMessage, false);
    try { window.opener.postMessage("authorizing:github", "*"); } catch (e) {}

    // Fallback: if parent never responds, still try to deliver token
    setTimeout(function () {
      if (!acknowledged) {
        try {
          window.opener.postMessage("authorization:github:success:" + JSON.stringify({ token: t }), "*");
          window.opener.postMessage("authorization:github:" + JSON.stringify({ token: t }), "*");
        } catch (e) {}
        closeOrRedirect();
      }
    }, 1200);
  } else {
    // No opener? go back to admin
    window.location.href = "/admin";
  }
})(${JSON.stringify(token)});
</script>
<p>Authentication complete. You can close this window.</p>
</body></html>`;

  const res = html(popup);
  const secure = SITE_URL.startsWith("https://");
  res.headers.append("set-cookie", `decap_oauth_state=; Max-Age=0; Path=/; SameSite=Lax;${secure ? " Secure;" : ""}`);
  return res;
}