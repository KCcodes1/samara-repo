import Link from "next/link";
import ProductCard from "@/components/cards/ProductCard";
import type { ProductFrontmatter } from "@/types/content";

export default function RelatedProducts({
  current,
  all,
  max = 4,
  title = "You may also like",
}: {
  current: ProductFrontmatter;
  all: ProductFrontmatter[];
  max?: number;
  title?: string;
}) {
  const set = new Set([...(current.categories || []), ...(current.tags || [])].map((s) => s.toLowerCase()));
  const related = all
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      const score =
        ((p.categories || []).some((c) => set.has(c.toLowerCase())) ? 2 : 0) +
        ((p.tags || []).some((t) => set.has(t.toLowerCase())) ? 1 : 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((x) => x.p);

  if (!related.length) return null;

  return (
    <section className="mt-10">
      <div className="mb-4 text-lg font-semibold">{title}</div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((item) => <ProductCard key={item.slug} item={item} />)}
      </div>
      <div className="mt-4 text-right text-sm">
        <Link href="/catalogue" className="text-brand underline">Browse full catalogue →</Link>
      </div>
    </section>
  );
}
