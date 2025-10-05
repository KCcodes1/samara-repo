import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ProjectFrontmatter } from '@/types/content';

interface ProjectCardProps {
  item: ProjectFrontmatter;
}

export default function ProjectCard({ item }: ProjectCardProps): JSX.Element {
  const coverImage = item.cover || item.gallery?.[0];
  
  return (
    <Link 
      href={`/projects/${item.slug}`}
      className="group block hover-raise"
      aria-label={`View ${item.title} project`}
    >
      <div className="elevated overflow-hidden">
        {/* Image container with aspect ratio */}
        <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-surface-100">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-surface-100 to-surface-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Title with line clamp */}
          <h3 className="font-semibold text-ink-900 group-hover:text-brand transition-colors mb-3 line-clamp-2">
            {item.title}
          </h3>
          
          {/* Metadata row */}
          <div className="flex flex-wrap gap-3 mb-3 text-sm text-ink-600">
            {item.location && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {item.location}
              </span>
            )}
            {item.style && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                {item.style}
              </span>
            )}
          </div>
          
          {/* Date */}
          {item.date && (
            <div className="text-sm text-ink-500">
              {new Date(item.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
