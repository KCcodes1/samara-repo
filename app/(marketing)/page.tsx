import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { siteConfig } from '@/config/site';
import { getPage } from '@/lib/pages';
import { getAllProducts } from '@/lib/products';
import { getAllProjects } from '@/lib/projects';
import ProductCard from '@/components/cards/ProductCard';
import ProjectCard from '@/components/cards/ProjectCard';

export default async function HomePage() {
  // Load content from markdown files
  const home = await getPage("home").catch(() => null);
  const products = await getAllProducts().catch(() => []);
  const projects = await getAllProjects().catch(() => []);
  const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(siteConfig.whatsappCtaDefault)}`;
  
  // Get featured products (prefer featured flag, else take first 3)
  const featuredProducts = products
    .filter(p => p.featured)
    .slice(0, 3)
    .concat(products.filter(p => !p.featured).slice(0, 3 - products.filter(p => p.featured).length))
    .slice(0, 3);
  
  // Get recent projects (first 3)
  const recentProjects = projects.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-surface-0 via-surface-50 to-brand-soft py-20 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              <div className="eyebrow mb-4">
                {siteConfig.tagline}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 mb-6 leading-tight">
                {home?.frontmatter.heroTitle || "Elevate your space with timeless pieces"}
              </h1>
              <p className="text-lg md:text-xl text-ink-700 mb-8 max-w-2xl mx-auto lg:mx-0">
                {home?.frontmatter.heroSubtitle || "Transform your living space with our curated collection of premium home décor and interior fittings. From modern minimalism to classic elegance, discover pieces that reflect your unique style."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  href="/catalogue"
                  variant="primary"
                  size="lg"
                  className="hover-raise"
                  aria-label="View our catalogue"
                >
                  View Catalogue
                </Button>
                <Button
                  asChild
                  href={whatsappUrl}
                  variant="outline"
                  size="lg"
                  className="hover-raise"
                  aria-label="Contact us on WhatsApp"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
            
            {/* Right: Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                {home?.frontmatter.heroImage ? (
                  <Image
                    src={home.frontmatter.heroImage}
                    alt="Hero image"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-soft via-surface-100 to-accent-50 flex items-center justify-center relative">
                    {/* Decorative shapes */}
                    <div className="absolute top-8 right-8 w-16 h-16 bg-brand/20 rounded-full"></div>
                    <div className="absolute bottom-12 left-8 w-12 h-12 bg-accent/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="text-center text-ink-600">
                        <svg className="w-20 h-20 mx-auto mb-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
                        </svg>
                        <p className="text-sm font-medium">Hero Image Placeholder</p>
                        <p className="text-xs text-ink-500">Upload /uploads/hero.jpg</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <Section
          title="Featured Products"
          subtitle="Discover our most popular pieces that transform any space"
          className="soft-section"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} item={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              href="/catalogue"
              variant="outline"
              size="lg"
              className="hover-raise"
            >
              View All Products
            </Button>
          </div>
        </Section>
      )}

      {/* Recent Projects Section */}
      {recentProjects.length > 0 && (
        <Section
          title="Recent Projects"
          subtitle="See how we've transformed spaces with our design expertise"
          className="bg-surface-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <ProjectCard key={project.slug} item={project} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              href="/projects"
              variant="outline"
              size="lg"
              className="hover-raise"
            >
              View All Projects
            </Button>
          </div>
        </Section>
      )}

      {/* Features Section */}
      <Section
        title="Why Choose Samara H&H?"
        subtitle="We bring together quality, style, and functionality in every piece we offer."
        className="soft-section"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 elevated hover-raise">
            <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-ink-900 mb-2">Premium Quality</h3>
            <p className="text-ink-600">
              Every piece is carefully selected for its superior craftsmanship and materials.
            </p>
          </div>
          
          <div className="text-center p-6 elevated hover-raise">
            <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-ink-900 mb-2">Modern Design</h3>
            <p className="text-ink-600">
              Stay ahead of trends with our contemporary and timeless design pieces.
            </p>
          </div>
          
          <div className="text-center p-6 elevated hover-raise">
            <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-ink-900 mb-2">Easy Shopping</h3>
            <p className="text-ink-600">
              Seamless online experience with fast shipping and excellent customer service.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-brand to-brand-fg text-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Browse {siteConfig.name} extensive catalogue and find the perfect pieces to create your dream home.
          </p>
          <Button
            asChild
            href="/catalogue"
            variant="outline"
            size="lg"
            className="bg-surface-0 text-brand hover:bg-surface-50 hover-raise"
            aria-label="Explore our catalogue"
          >
            Explore Our Catalogue
          </Button>
        </div>
      </Section>
    </>
  );
}
