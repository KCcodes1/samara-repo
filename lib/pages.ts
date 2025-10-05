import path from "path";
import { readFile, joinContent } from "./fs-helpers";
import { parseMarkdown } from "./md";
import type { PageFrontmatter } from "@/types/content";

export async function getPage(slug: "home" | "about" | "services") {
  const file = path.join(joinContent("pages"), `${slug}.md`);
  const raw = readFile(file);
  const parsed = await parseMarkdown<PageFrontmatter>(raw, true);
  return { frontmatter: parsed.data, html: parsed.html || "", markdown: parsed.content };
}
