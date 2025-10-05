"use client";
import { useMemo } from "react";
import TagPill from "./TagPill";

export type FilterPanelProps = {
  categories: { slug: string; title: string }[];
  allTags: string[];
  selectedCats: string[];
  selectedTags: string[];
  sort: string;
  onChange: ({
    cats, // eslint-disable-line no-unused-vars
    tags, // eslint-disable-line no-unused-vars
    q, // eslint-disable-line no-unused-vars
    sort, // eslint-disable-line no-unused-vars
  }: {
    cats?: string[];
    tags?: string[];
    q?: string;
    sort?: string;
  }) => void;
};

export default function FilterPanel({
  categories,
  allTags,
  selectedCats,
  selectedTags,
  sort,
  onChange,
}: FilterPanelProps) {
  const sorts = useMemo(
    () => [
      { value: "relevance", label: "Relevance" },
      { value: "price-asc", label: "Price: Low → High" },
      { value: "price-desc", label: "Price: High → Low" },
      { value: "newest", label: "Newest" },
      { value: "title-asc", label: "Title A → Z" },
      { value: "title-desc", label: "Title Z → A" },
    ],
    []
  );

  return (
    <aside className="space-y-6">
      {/* Categories */}
      <div>
        <div className="mb-2 text-sm font-medium text-gray-700">Categories</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const isSel = selectedCats.includes(c.slug);
            return (
              <TagPill
                key={c.slug}
                label={c.title}
                selected={isSel}
                onToggle={(next) => {
                  const set = new Set(selectedCats);
                  next ? set.add(c.slug) : set.delete(c.slug);
                  onChange({ cats: Array.from(set) });
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <div>
        <div className="mb-2 text-sm font-medium text-gray-700">Tags</div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => {
            const isSel = selectedTags.includes(t);
            return (
              <TagPill
                key={t}
                label={t}
                selected={isSel}
                onToggle={(next) => {
                  const set = new Set(selectedTags);
                  next ? set.add(t) : set.delete(t);
                  onChange({ tags: Array.from(set) });
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Sort</label>
        <select
          value={sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
          aria-label="Sort catalogue"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
