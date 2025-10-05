import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ProjectFrontmatter } from '@/types/content';

interface ProjectListItemProps {
  p: ProjectFrontmatter;
}

export default function ProjectListItem({ p }: ProjectListItemProps): JSX.Element {
  const coverImage = p.cover || p.gallery?.[0];
  
  return (
    <Link 
      href={`/projects/${p.slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-12 bg-gray-100 relative">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={p.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
          {p.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-2 text-sm text-gray-600">
          {p.location && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {p.location}
            </span>
          )}
          {p.style && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              {p.style}
            </span>
          )}
        </div>
        
        {p.date && (
          <div className="text-xs text-gray-500">
            {new Date(p.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })}
          </div>
        )}
      </div>
    </Link>
  );
}
