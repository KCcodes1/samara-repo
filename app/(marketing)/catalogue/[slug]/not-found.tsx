import React from 'react';
import { Container } from '@/components/Container';
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <Container className="py-12">
      <div className="text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.9-6.1-2.4l-.1-.1M12 15c-2.34 0-4.5-.9-6.1-2.4l-.1-.1" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the product you&apos;re looking for. It may have been removed or the link might be incorrect.
        </p>
        
        <div className="space-x-4">
          <Link
            href="/catalogue"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse All Products
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </Container>
  );
}
