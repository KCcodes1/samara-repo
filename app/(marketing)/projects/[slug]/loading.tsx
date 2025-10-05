import React from 'react';
import { Container } from '@/components/Container';

export default function ProjectLoading() {
  return (
    <Container className="py-12">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
        <div className="h-4 bg-gray-200 rounded w-2"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>

      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex space-x-4 mb-6">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-28"></div>
        </div>
      </div>

      {/* Cover image skeleton */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg h-96 mb-8"></div>

      {/* Content skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Gallery skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-24 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    </Container>
  );
}
