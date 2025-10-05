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
  const stateCookie = cookies().get("decap_oauth_state")?.value;

  if (!code) return html("<p>Missing OAuth code</p>", 400);
  if (!returnedState || !stateCookie || returnedState !== stateCookie) return html("<p>Invalid state</p>", 400);
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) return html("<p>Missing GitHub credentials</p>", 500);

  const SITE_URL = getSiteUrl();

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

  const data = (await tokenRes.json()) as { access_token?: string; error?: string; error_description?: string };
  const token = data.access_token;
  if (!token) {
    const msg = data.error_description || data.error || "No access token";
    return html(`<!doctype html><p>OAuth failed.</p><pre>${msg}</pre>`, 500);
  }

  const page = `<!doctype html><html><body>
<script>
(function(t){
  try {
    if (window.opener) {
      var payload = JSON.stringify({ token: t });

      // Broadcast multiple formats; various Decap builds listen for different ones
      try { window.opener.postMessage("authorizing:github", "*"); } catch(e){}
      try { window.opener.postMessage("authorization:github:" + payload, "*"); } catch(e){}
      try { window.opener.postMessage("authorization:github:success:" + payload, "*"); } catch(e){}
      try { window.opener.postMessage("authorization:github:success:" + t, "*"); } catch(e){}

      // Hash fallback: Decap can also read #access_token=...
      try {
        var h = (window.opener.location.hash || "").replace(/^#*/, "");
        var kv = new URLSearchParams(h);
        kv.set("access_token", t);
        window.opener.location.hash = kv.toString();
      } catch(e){}
    } else {
      // No opener → go back to admin with token in hash
      try { window.location.href = "/admin#access_token=" + encodeURIComponent(t); return; } catch(e){}
    }
  } finally {
    setTimeout(function(){ try{ window.close(); } catch(e){ window.location.href = "/admin"; } }, 300);
  }
})(${JSON.stringify(token)});
</script>
<p>Authentication complete. You can close this window.</p>
</body></html>`;

  const res = html(page);
  res.headers.append(
    "set-cookie",
    `decap_oauth_state=; Max-Age=0; Path=/; SameSite=Lax; ${SITE_URL.startsWith("https://") ? "Secure; " : ""}`
  );
  return res;
}