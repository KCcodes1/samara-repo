# Deploy to Vercel (Production: samarahomes.co.ke)

## Prereqs
- `npm i -g vercel`
- `vercel login`
- `vercel link` (link this repo to your Vercel project)

## Env setup
1. Copy the template and fill **real values** locally:

```bash
cp .env.production.example .env.production
```

2. Add envs to Vercel Production using the CLI:

```bash
bash scripts/seed-vercel-envs.sh
```

3. In Vercel dashboard → Project → **Settings → Environment Variables** (Production), confirm variables exist.
4. Ensure the app routes that need Node runtime still export:
```ts
export const runtime = "nodejs";
```

## Domain & OAuth

CMS config is set to:

```
base_url: https://samarahomes.co.ke
auth_endpoint: /api/decap/auth
```

Update GitHub OAuth App Authorization callback URL to:

```
https://samarahomes.co.ke/api/decap/callback
```

## DNS records to add at your registrar

**Apex/root (@)** → A → 76.76.21.21

**www** → CNAME → cname.vercel-dns.com

After adding records, in Vercel → Project → Settings → Domains, add samarahomes.co.ke and www.samarahomes.co.ke, and set your preferred primary (www or apex) + redirect.

## Post-deploy checks

1. Visit https://samarahomes.co.ke/api/smtp-check → expect { ok: true }
2. Visit https://samarahomes.co.ke/admin → GitHub login works
3. Publish a product in CMS → confirm it appears on the site within your ISR window (or trigger revalidation)
