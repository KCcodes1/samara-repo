export function getSiteUrl() {
  const raw =
    (process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')).trim();

  const url = raw || 'https://samarahomes.co.ke'; // production-safe fallback
  return url.replace(/\/$/, '');
}