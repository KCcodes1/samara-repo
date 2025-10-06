import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ProductFrontmatter } from '@/types/content';

interface ProductCardProps {
  item: ProductFrontmatter;
}

export default function ProductCard({ item }: ProductCardProps): JSX.Element {
  const firstImage = item.images?.[0];
  
  return (
    <Link 
      href={`/catalogue/${item.slug}`}
      className="group block hover-raise animate-fade-in-up"
      aria-label={`View ${item.title}`}
    >
      <div className="elevated overflow-hidden relative">
        {/* Image container with aspect ratio */}
        <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-surface-100">
          {firstImage ? (
            <Image
              src={firstImage}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition-all duration-500 ease-out-back"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-surface-100 to-surface-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Title with line clamp */}
          <h3 className="font-semibold text-ink-900 group-hover:text-brand transition-all duration-300 mb-3 line-clamp-2">
            {item.title}
          </h3>
          
          {/* Price */}
          {item.price && (
            <div className="text-xl font-bold text-brand mb-3">
              KSh {item.price.toLocaleString()}
            </div>
          )}
          
          {/* Categories/Tags */}
          {item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="inline-block px-3 py-1 text-xs font-medium bg-brand-soft text-brand-fg rounded-full"
                >
                  {category}
                </span>
              ))}
              {item.categories.length > 2 && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-surface-100 text-ink-500 rounded-full">
                  +{item.categories.length - 2}
                </span>
              )}
            </div>
          )}
          
          {/* Description */}
          {item.description && (
            <p className="text-sm text-ink-600 line-clamp-2">
              {item.description}
            </p>
          )}
          
          {/* Featured badge */}
          {item.featured && (
            <div className="mt-3">
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-accent-100 text-accent-700 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
