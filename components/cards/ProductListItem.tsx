import React from 'react';
import Link from 'next/link';
import type { ProductFrontmatter } from '@/types/content';

interface ProductListItemProps {
  p: ProductFrontmatter;
}

export default function ProductListItem({ p }: ProductListItemProps): JSX.Element {
  const firstImage = p.images?.[0];
  
  return (
    <Link 
      href={`/catalogue/${p.slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-12 bg-gray-100">
        {firstImage ? (
          <img
            src={firstImage}
            alt={p.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
          {p.title}
        </h3>
        
        {p.price && (
          <div className="text-lg font-bold text-primary-600 mb-2">
            KSh {p.price.toLocaleString()}
          </div>
        )}
        
        {p.categories && p.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {p.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {category}
              </span>
            ))}
            {p.categories.length > 2 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                +{p.categories.length - 2}
              </span>
            )}
          </div>
        )}
        
        {p.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {p.description}
          </p>
        )}
      </div>
    </Link>
  );
}
