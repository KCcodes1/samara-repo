import React from 'react';
import Link from 'next/link';

export type Crumb = { 
  name: string; 
  href?: string; 
};

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps): JSX.Element {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-gray-400" aria-hidden="true">
                /
              </span>
            )}
            <span
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span 
                  className="text-gray-900 font-medium"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="hover:text-primary-600 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
