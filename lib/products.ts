import path from "path";
import { listDir, readFile, joinContent } from "./fs-helpers";
import { parseMarkdown } from "./md";
import type { ProductFrontmatter } from "@/types/content";

export async function getAllProducts() {
  const dir = joinContent("products");
  const files = listDir(dir).filter((f) => f.endsWith(".md"));
  const items: (ProductFrontmatter & { slug: string })[] = [];
  for (const file of files) {
    const raw = readFile(path.join(dir, file));
    const parsed = await parseMarkdown<ProductFrontmatter>(raw);
    if (!parsed.data?.slug) continue;
    items.push({ ...parsed.data, slug: parsed.data.slug });
  }
  // Optional: sort by date desc then title
  items.sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
  return items;
}

export async function getProductBySlug(slug: string) {
  const dir = joinContent("products");
  const files = listDir(dir).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const raw = readFile(path.join(dir, file));
    const parsed = await parseMarkdown<ProductFrontmatter>(raw, true);
    if (parsed.data?.slug === slug) {
      return { frontmatter: parsed.data, html: parsed.html || "", markdown: parsed.content };
    }
  }
  return null;
}

export type Category = { slug: string; title: string };

export function getCategories(): Category[] {
  const raw = readFile(joinContent("categories", "categories.json"));
  const json = JSON.parse(raw) as { categories: Category[] };
  return json.categories;
}
