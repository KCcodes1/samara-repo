import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type ParsedMarkdown<T> = {
  data: T;
  content: string;      // raw markdown
  html?: string;        // rendered HTML (optional)
};

export async function parseMarkdown<T>(raw: string, renderHtml = false): Promise<ParsedMarkdown<T>> {
  const { data, content } = matter(raw);
  let rendered: string | undefined = undefined;
  if (renderHtml) {
    const processed = await remark().use(html).process(content);
    rendered = processed.toString();
  }
  return { data: data as T, content, html: rendered };
}
