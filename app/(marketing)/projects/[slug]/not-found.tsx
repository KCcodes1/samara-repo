import React from 'react';
import { Container } from '@/components/Container';
import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <Container className="py-12">
      <div className="text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the project you&apos;re looking for. It may have been removed or the link might be incorrect.
        </p>
        
        <div className="space-x-4">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse All Projects
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
