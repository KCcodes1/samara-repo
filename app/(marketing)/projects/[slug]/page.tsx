import React from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { getAllProducts } from '@/lib/products';
import { getContactInfo } from '@/lib/settings';
import { getSiteUrl } from '@/lib/siteUrl';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Gallery from '@/components/gallery/Gallery';
import RelatedProducts from '@/components/related/RelatedProducts';
import ShareButtons from '@/components/ShareButtons';
import { BreadcrumbsLD } from '@/components/jsonld/BreadcrumbsLD';
import { canon } from '@/lib/meta';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const { frontmatter } = project;
  const canonicalUrl = canon(`/projects/${slug}`);
  const ogImage = frontmatter.cover || frontmatter.gallery?.[0];
  const description = `View our ${frontmatter.style || 'interior design'} project${frontmatter.location ? ` in ${frontmatter.location}` : ''} - ${frontmatter.title}`;

  return {
    title: frontmatter.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: frontmatter.title,
      description,
      images: ogImage ? [{ url: ogImage, alt: frontmatter.title }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const allProducts = await getAllProducts();
  const contactInfo = await getContactInfo();
  const siteUrl = getSiteUrl();

  if (!project) {
    notFound();
  }

  const { frontmatter, html } = project;
  const galleryImages = frontmatter.gallery?.map(img => ({ src: img, alt: frontmatter.title })) || [];
  const hasGallery = galleryImages.length > 0;
  const coverImage = frontmatter.cover || frontmatter.gallery?.[0];
  const projectUrl = `${siteUrl}/projects/${slug}`;

  return (
    <>
      {/* JSON-LD */}
      <BreadcrumbsLD
        items={[
          { name: 'Home', url: canon('/') },
          { name: 'Projects', url: canon('/projects') },
          { name: frontmatter.title, url: canon(`/projects/${slug}`) },
        ]}
      />

      <Container className="py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Projects', href: '/projects' },
            { name: frontmatter.title },
          ]}
        />

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink-900 mb-4">{frontmatter.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-ink-600 mb-6">
            {frontmatter.location && (
              <div className="flex items-center px-3 py-1 bg-surface-100 rounded-full">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {frontmatter.location}
              </div>
            )}
            {frontmatter.style && (
              <div className="flex items-center px-3 py-1 bg-surface-100 rounded-full">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                {frontmatter.style}
              </div>
            )}
            {frontmatter.date && (
              <div className="flex items-center px-3 py-1 bg-surface-100 rounded-full">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(frontmatter.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </div>
            )}
          </div>

          {/* Share Buttons */}
          <div className="mb-6">
            <ShareButtons
              title={frontmatter.title}
              url={projectUrl}
              whatsappNumber={contactInfo.whatsappNumber}
            />
          </div>
        </div>

        {/* Gallery or Cover Image */}
        {hasGallery ? (
          <div className="mb-8">
            <Gallery 
              images={galleryImages} 
              ratio="aspect-[4/3]"
              thumbCount={6}
            />
          </div>
        ) : coverImage ? (
          <div className="mb-8">
            <div className="relative w-full h-96 bg-surface-100 rounded-xl overflow-hidden">
              <Image
                src={coverImage}
                alt={frontmatter.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        ) : null}

        {/* Project Content */}
        {html && (
          <div className="mb-8">
            <div 
              className="prose-basic"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}

        {/* Featured Products from this Project */}
        {allProducts.length > 0 && (
          <RelatedProducts
            current={{
              title: frontmatter.title,
              slug: frontmatter.slug,
              categories: frontmatter.style ? [frontmatter.style] : [],
              tags: frontmatter.location ? [frontmatter.location] : [],
            }}
            all={allProducts}
            max={3}
            title="Featured products from this project"
          />
        )}

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-surface-200">
          <Link
            href="/projects"
            className="inline-flex items-center text-brand hover:text-brand-fg font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </Container>
    </>
  );
}
