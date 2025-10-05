import React from 'react';
import { Container } from '@/components/Container';

export default function ProductLoading() {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image skeleton */}
        <div>
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg h-96 mb-4"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg h-20"></div>
            ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
