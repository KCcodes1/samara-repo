import React from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import type { Metadata } from 'next';
import Link from 'next/link';
import Gallery from '@/components/gallery/Gallery';
import RelatedProducts from '@/components/related/RelatedProducts';
import ShareButtons from '@/components/ShareButtons';
import { ProductLD } from '@/components/jsonld/ProductLD';
import { BreadcrumbsLD } from '@/components/jsonld/BreadcrumbsLD';
import { canon } from '@/lib/meta';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const { frontmatter } = product;
  const canonicalUrl = canon(`/catalogue/${slug}`);
  const ogImage = frontmatter.images?.[0];

  return {
    title: frontmatter.title,
    description: frontmatter.description || `View ${frontmatter.title} - ${frontmatter.price ? `KSh ${frontmatter.price.toLocaleString()}` : 'Available now'}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || `View ${frontmatter.title} - ${frontmatter.price ? `KSh ${frontmatter.price.toLocaleString()}` : 'Available now'}`,
      images: ogImage ? [{ url: ogImage, alt: frontmatter.title }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description || `View ${frontmatter.title} - ${frontmatter.price ? `KSh ${frontmatter.price.toLocaleString()}` : 'Available now'}`,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const allProducts = await getAllProducts();

  if (!product) {
    notFound();
  }

  const { frontmatter, html } = product;
  const galleryImages = frontmatter.images?.map(img => ({ src: img, alt: frontmatter.title })) || [];
  const whatsappMessage = `Hi! I'm interested in ${frontmatter.title}${frontmatter.price ? ` (KSh ${frontmatter.price.toLocaleString()})` : ''}. Can you tell me more about it?`;
  const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      {/* JSON-LD */}
      <ProductLD
        name={frontmatter.title}
        images={frontmatter.images || []}
        description={frontmatter.description}
        sku={frontmatter.sku}
        price={frontmatter.price}
        currency="KES"
      />
      <BreadcrumbsLD
        items={[
          { name: 'Home', url: canon('/') },
          { name: 'Catalogue', url: canon('/catalogue') },
          { name: frontmatter.title, url: canon(`/catalogue/${slug}`) },
        ]}
      />

      <Container className="py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Catalogue', href: '/catalogue' },
            { name: frontmatter.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-7">
            <Gallery 
              images={galleryImages} 
              ratio="aspect-[4/3]"
              thumbCount={6}
            />
          </div>

          {/* Right Column - Sticky Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-xl shadow-card p-6">
                <h1 className="text-3xl font-bold text-ink-900 mb-4">{frontmatter.title}</h1>
                
                {frontmatter.price && (
                  <div className="text-3xl font-bold text-brand mb-4">
                    KSh {frontmatter.price.toLocaleString()}
                  </div>
                )}
                
                {frontmatter.sku && (
                  <div className="text-sm text-ink-500 mb-4">
                    SKU: {frontmatter.sku}
                  </div>
                )}

                {/* Categories and Tags */}
                {(frontmatter.categories?.length || frontmatter.tags?.length) && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {frontmatter.categories?.map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 bg-brand-soft text-brand-fg rounded-full text-sm font-medium"
                        >
                          {category}
                        </span>
                      ))}
                      {frontmatter.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-surface-100 text-ink-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* WhatsApp CTA */}
                <div className="mb-6">
                  <Button
                    asChild
                    href={whatsappUrl}
                    variant="primary"
                    size="lg"
                    className="w-full hover-raise"
                  >
                    Contact on WhatsApp
                  </Button>
                </div>

                {/* Share Buttons */}
                <div className="mb-6">
                  <ShareButtons
                    title={frontmatter.title}
                    url={canon(`/catalogue/${slug}`)}
                    whatsappMessage={whatsappMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {html && (
          <div className="mt-8">
            <div 
              className="prose-basic"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}

        {/* Related Products */}
        <RelatedProducts
          current={frontmatter}
          all={allProducts}
          max={4}
          title="You may also like"
        />

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-surface-200">
          <Link
            href="/catalogue"
            className="inline-flex items-center text-brand hover:text-brand-fg font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Catalogue
          </Link>
        </div>
      </Container>
    </>
  );
}
