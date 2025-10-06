import path from "path";
import { listDir, readFile, joinContent } from "./fs-helpers";
import { parseMarkdown } from "./md";
import type { ProjectFrontmatter } from "@/types/content";

export async function getAllProjects() {
  const dir = joinContent("projects");
  const files = listDir(dir).filter((f) => f.endsWith(".md") && f !== "README.md");
  const items: (ProjectFrontmatter & { slug: string })[] = [];
  for (const file of files) {
    const raw = readFile(path.join(dir, file));
    const parsed = await parseMarkdown<ProjectFrontmatter>(raw);
    if (!parsed.data?.slug) continue;
    items.push({ ...parsed.data, slug: parsed.data.slug });
  }
  items.sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
  return items;
}

export async function getProjectBySlug(slug: string) {
  const dir = joinContent("projects");
  const files = listDir(dir).filter((f) => f.endsWith(".md") && f !== "README.md");
  for (const file of files) {
    const raw = readFile(path.join(dir, file));
    const parsed = await parseMarkdown<ProjectFrontmatter>(raw, true);
    if (parsed.data?.slug === slug) {
      return { frontmatter: parsed.data, html: parsed.html || "", markdown: parsed.content };
    }
  }
  return null;
}
