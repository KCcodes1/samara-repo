"use client";
import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/cards/ProductCard";
import FilterPanel from "@/components/filters/FilterPanel";
import SearchInput from "@/components/filters/SearchInput";
import TagPill from "@/components/filters/TagPill";
import type { ProductFrontmatter } from "@/types/content";
import type { Category } from "@/lib/products";

interface CatalogueClientProps {
  products: (ProductFrontmatter & { slug: string })[];
  categories: Category[];
}

type SortOption = "relevance" | "price-asc" | "price-desc" | "newest" | "title-asc" | "title-desc";

export default function CatalogueClient({ products, categories }: CatalogueClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Parse URL params
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("cat") || "";
  const tag = searchParams.get("tag") || "";
  const sort = (searchParams.get("sort") as SortOption) || "relevance";

  // Parse comma-separated values
  const selectedCats = useMemo(() => 
    cat.split(",").filter(Boolean), [cat]
  );
  const selectedTags = useMemo(() => 
    tag.split(",").filter(Boolean), [tag]
  );

  // Extract all unique tags from products
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    products.forEach(product => {
      product.tags?.forEach(tag => {
        tagSet.add(tag.toLowerCase());
      });
    });
    return Array.from(tagSet).sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query filter
      if (q) {
        const searchText = [
          product.title,
          product.description || "",
          product.sku || "",
          ...(product.tags || []),
          ...(product.categories || [])
        ].join(" ").toLowerCase();
        
        if (!searchText.includes(q.toLowerCase())) {
          return false;
        }
      }

      // Category filter
      if (selectedCats.length > 0) {
        const hasMatchingCategory = product.categories?.some(cat => 
          selectedCats.includes(cat)
        );
        if (!hasMatchingCategory) {
          return false;
        }
      }

      // Tag filter
      if (selectedTags.length > 0) {
        const hasMatchingTag = product.tags?.some(tag => 
          selectedTags.includes(tag.toLowerCase())
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return (a.price || 0) - (b.price || 0);
        case "price-desc":
          return (b.price || 0) - (a.price || 0);
        case "newest":
          return (b.date || "").localeCompare(a.date || "");
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "relevance":
        default:
          // Basic relevance: title start match > title include > tag include
          if (q) {
            const aTitleStart = a.title.toLowerCase().startsWith(q.toLowerCase());
            const bTitleStart = b.title.toLowerCase().startsWith(q.toLowerCase());
            if (aTitleStart && !bTitleStart) return -1;
            if (!aTitleStart && bTitleStart) return 1;
            
            const aTitleInclude = a.title.toLowerCase().includes(q.toLowerCase());
            const bTitleInclude = b.title.toLowerCase().includes(q.toLowerCase());
            if (aTitleInclude && !bTitleInclude) return -1;
            if (!aTitleInclude && bTitleInclude) return 1;
          }
          return 0;
      }
    });

    return filtered;
  }, [products, q, selectedCats, selectedTags, sort]);

  // Update URL when filters change
  const updateURL = useCallback((updates: {
    cats?: string[];
    tags?: string[];
    q?: string;
    sort?: string;
  }) => {
    console.log("updateURL called with:", updates);
    const params = new URLSearchParams(searchParams);
    
    if (updates.q !== undefined) {
      if (updates.q) {
        params.set("q", updates.q);
        console.log("Set q to:", updates.q);
      } else {
        params.delete("q");
        console.log("Deleted q parameter");
      }
    }
    
    if (updates.cats !== undefined) {
      if (updates.cats.length > 0) {
        params.set("cat", updates.cats.join(","));
        console.log("Set cat to:", updates.cats.join(","));
      } else {
        params.delete("cat");
        console.log("Deleted cat parameter");
      }
    }
    
    if (updates.tags !== undefined) {
      if (updates.tags.length > 0) {
        params.set("tag", updates.tags.join(","));
        console.log("Set tag to:", updates.tags.join(","));
      } else {
        params.delete("tag");
        console.log("Deleted tag parameter");
      }
    }
    
    if (updates.sort !== undefined) {
      if (updates.sort !== "relevance") {
        params.set("sort", updates.sort);
        console.log("Set sort to:", updates.sort);
      } else {
        params.delete("sort");
        console.log("Deleted sort parameter");
      }
    }

    const newURL = params.toString() ? `?${params.toString()}` : "";
    console.log("New URL:", newURL);
    // Navigate to the base catalogue path when clearing all filters
    if (newURL === "") {
      router.replace("/catalogue", { scroll: false });
    } else {
      router.replace(`/catalogue${newURL}`, { scroll: false });
    }
  }, [searchParams, router]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    console.log("Clearing all filters...");
    console.log("Current filters:", { q, selectedCats, selectedTags, sort });
    // Use the updateURL function to clear all parameters
    updateURL({
      q: "",
      cats: [],
      tags: [],
      sort: "relevance"
    });
    console.log("Filters cleared - should show all products");
  }, [updateURL, q, selectedCats, selectedTags, sort]);

  // Check if any filters are active
  const hasActiveFilters = q || selectedCats.length > 0 || selectedTags.length > 0 || sort !== "relevance";

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl">
            <span className="font-medium text-gray-900">Filters</span>
            <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="p-4 bg-gray-50 rounded-b-xl">
            <FilterPanel
              categories={categories}
              allTags={allTags}
              selectedCats={selectedCats}
              selectedTags={selectedTags}
              sort={sort}
              onChange={updateURL}
            />
          </div>
        </details>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-64 lg:w-80">
          <FilterPanel
            categories={categories}
            allTags={allTags}
            selectedCats={selectedCats}
            selectedTags={selectedTags}
            sort={sort}
            onChange={updateURL}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full sm:w-64">
                <SearchInput
                  defaultValue={q}
                  onChange={(value) => updateURL({ q: value })}
                  placeholder="Search products…"
                />
              </div>
              <div className="w-full sm:w-48">
                <select
                  value={sort}
                  onChange={(e) => updateURL({ sort: e.target.value as SortOption })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
                  aria-label="Sort catalogue"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="newest">Newest</option>
                  <option value="title-asc">Title A → Z</option>
                  <option value="title-desc">Title Z → A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                <button
                  onClick={() => {
                    console.log("Clear all button clicked (active filters)");
                    clearAllFilters();
                  }}
                  className="text-sm text-brand hover:text-brand-dark underline cursor-pointer"
                  type="button"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {q && (
                  <TagPill
                    label={`Search: "${q}"`}
                    selected={true}
                    onToggle={() => updateURL({ q: "" })}
                  />
                )}
                {selectedCats.map(catSlug => {
                  const category = categories.find(c => c.slug === catSlug);
                  return (
                    <TagPill
                      key={catSlug}
                      label={category?.title || catSlug}
                      selected={true}
                      onToggle={() => {
                        const newCats = selectedCats.filter(c => c !== catSlug);
                        updateURL({ cats: newCats });
                      }}
                    />
                  );
                })}
                {selectedTags.map(tag => (
                  <TagPill
                    key={tag}
                    label={tag}
                    selected={true}
                    onToggle={() => {
                      const newTags = selectedTags.filter(t => t !== tag);
                      updateURL({ tags: newTags });
                    }}
                  />
                ))}
                {sort !== "relevance" && (
                  <TagPill
                    label={`Sort: ${sort}`}
                    selected={true}
                    onToggle={() => updateURL({ sort: "relevance" })}
                  />
                )}
              </div>
            </div>
          )}

          {/* Results Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} item={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      console.log("Clear all button clicked (no results)");
                      clearAllFilters();
                    }}
                    className="inline-flex items-center px-4 py-2 bg-brand text-white rounded-xl hover:bg-brand-dark transition-colors cursor-pointer"
                    type="button"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
