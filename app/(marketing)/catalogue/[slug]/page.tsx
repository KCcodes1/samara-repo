import React from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import { getContactInfo } from '@/lib/settings';
import { getSiteUrl } from '@/lib/siteUrl';
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
  const contactInfo = await getContactInfo();
  const siteUrl = getSiteUrl();

  if (!product) {
    notFound();
  }

  const { frontmatter, html } = product;
  const galleryImages = frontmatter.images?.map(img => ({ src: img, alt: frontmatter.title })) || [];
  const whatsappMessage = `Hi! I'm interested in ${frontmatter.title}${frontmatter.price ? ` (KSh ${frontmatter.price.toLocaleString()})` : ''}. Can you tell me more about it?`;
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const productUrl = `${siteUrl}/catalogue/${slug}`;

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

      <Container className="py-8 md:py-12">
        {/* Breadcrumbs */}
        <div className="mb-8 animate-fade-in-up">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Catalogue', href: '/catalogue' },
              { name: frontmatter.title },
            ]}
          />
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column - Gallery */}
          <div className="xl:col-span-7 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="sticky top-8">
              <Gallery 
                images={galleryImages} 
                ratio="aspect-[4/3]"
                thumbCount={6}
              />
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="xl:col-span-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="sticky top-8">
              {/* Product Header */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-ink-900 mb-4 leading-tight">
                  {frontmatter.title}
                </h1>
                
                {/* Price Section */}
                {frontmatter.price && (
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-brand">
                      KSh {frontmatter.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-ink-500 bg-success-50 text-success-700 px-3 py-1 rounded-full font-medium">
                      Available
                    </span>
                  </div>
                )}
                
                {/* SKU */}
                {frontmatter.sku && (
                  <div className="text-sm text-ink-500 mb-6">
                    <span className="font-medium">SKU:</span> {frontmatter.sku}
                  </div>
                )}
              </div>

              {/* Categories and Tags */}
              {(frontmatter.categories?.length || frontmatter.tags?.length) && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-ink-700 mb-3 uppercase tracking-wide">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.categories?.map((category) => (
                      <span
                        key={category}
                        className="px-4 py-2 bg-brand-soft text-brand-fg rounded-full text-sm font-medium hover:bg-brand hover:text-white transition-colors duration-300"
                      >
                        {category}
                      </span>
                    ))}
                    {frontmatter.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-surface-100 text-ink-600 rounded-full text-sm hover:bg-ink-100 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                {/* Primary WhatsApp CTA */}
                <Button
                  asChild
                  href={whatsappUrl}
                  variant="primary"
                  size="xl"
                  className="w-full hover-raise text-lg font-semibold"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Contact on WhatsApp
                  </div>
                </Button>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    href={`tel:${contactInfo.phone}`}
                    variant="outline"
                    size="lg"
                    className="hover-raise"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </div>
                  </Button>
                  
                  <Button
                    asChild
                    href={`mailto:${contactInfo.email}?subject=Inquiry about ${frontmatter.title}`}
                    variant="outline"
                    size="lg"
                    className="hover-raise"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </div>
                  </Button>
                </div>
              </div>

              {/* Share Section */}
              <div className="border-t border-surface-200 pt-6">
                <h3 className="text-sm font-semibold text-ink-700 mb-4 uppercase tracking-wide">Share this product</h3>
                <ShareButtons
                  title={frontmatter.title}
                  url={productUrl}
                  whatsappMessage={whatsappMessage}
                  whatsappNumber={contactInfo.whatsappNumber}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        {html && (
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white rounded-2xl shadow-soft-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-ink-900 mb-6">Product Details</h2>
              <div 
                className="prose-basic max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        )}

        {/* Features/Highlights Section */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-soft hover-raise">
              <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink-900 mb-2">Premium Quality</h3>
              <p className="text-ink-600">Carefully selected materials and expert craftsmanship</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-soft hover-raise">
              <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink-900 mb-2">Fast Delivery</h3>
              <p className="text-ink-600">Quick and reliable shipping across Kenya</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-soft hover-raise">
              <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink-900 mb-2">Customer Support</h3>
              <p className="text-ink-600">Dedicated support team ready to help you</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <RelatedProducts
            current={frontmatter}
            all={allProducts}
            max={4}
            title="You may also like"
          />
        </div>

        {/* Back to Catalogue */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-3 px-8 py-4 bg-surface-50 hover:bg-surface-100 text-ink-700 hover:text-ink-900 font-semibold rounded-xl transition-all duration-300 hover-raise"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Catalogue
          </Link>
        </div>
      </Container>
    </>
  );
}
