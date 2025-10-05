import { siteConfig } from "@/config/site";

export function canon(path: string) {
  const base = siteConfig.url?.replace(/\/$/, "") || "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
