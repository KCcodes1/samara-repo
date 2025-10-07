import path from "path";
import { listDir, readFile, joinContent } from "./fs-helpers";
import { parseMarkdown } from "./md";
import type { ProductFrontmatter } from "@/types/content";

export async function getAllProducts() {
  const dir = joinContent("products");
  const files = listDir(dir).filter((f) => f.endsWith(".md") && f !== "README.md");
  const items: (ProductFrontmatter & { slug: string })[] = [];
  for (const file of files) {
    const raw = readFile(path.join(dir, file));
    const parsed = await parseMarkdown<ProductFrontmatter>(raw);
    if (!parsed.data?.slug) continue;
    items.push({ ...parsed.data, slug: parsed.data.slug });
  }
  // Optional: sort by date desc then title
  items.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")) || a.title.localeCompare(b.title));
  return items;
}

export async function getProductBySlug(slug: string) {
  const dir = joinContent("products");
  const files = listDir(dir).filter((f) => f.endsWith(".md") && f !== "README.md");
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

export async function getCategories(): Promise<Category[]> {
  const products = await getAllProducts();
  const categoryMap = new Map<string, string>();
  
  // Extract unique categories from all products
  products.forEach(product => {
    if (product.categories) {
      product.categories.forEach(categorySlug => {
        if (!categoryMap.has(categorySlug)) {
          // Convert slug to title (capitalize and replace hyphens with spaces)
          const title = categorySlug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          categoryMap.set(categorySlug, title);
        }
      });
    }
  });
  
  // Convert map to array and sort alphabetically
  return Array.from(categoryMap.entries())
    .map(([slug, title]) => ({ slug, title }))
    .sort((a, b) => a.title.localeCompare(b.title));
}
