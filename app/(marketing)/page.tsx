import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { siteConfig } from '@/config/site';
import { getPage } from '@/lib/pages';
import { getAllProducts } from '@/lib/products';
import { getAllProjects } from '@/lib/projects';
import { getContactInfo } from '@/lib/settings';
import ProductCard from '@/components/cards/ProductCard';
import ProjectCard from '@/components/cards/ProjectCard';

export default async function HomePage() {
  // Load content from markdown files
  const home = await getPage("home").catch(() => null);
  const products = await getAllProducts().catch(() => []);
  const projects = await getAllProjects().catch(() => []);
  const contactInfo = await getContactInfo();
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`;
  
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
      {/* Mobile-First Hero Section - Full Screen Impact */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface-0 via-surface-50 to-brand-soft">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {home?.frontmatter.heroImage ? (
            <Image
              src={home.frontmatter.heroImage}
              alt="Beautiful home interior"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-soft via-surface-100 to-accent-50 flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute top-20 right-20 w-32 h-32 bg-brand/10 rounded-full animate-float"></div>
              <div className="absolute bottom-32 left-16 w-24 h-24 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-center text-ink-600">
                  <svg className="w-24 h-24 mx-auto mb-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
                  </svg>
                  <p className="text-sm font-medium">Hero Image Placeholder</p>
                  <p className="text-xs text-ink-500">Upload /uploads/hero.jpg</p>
                </div>
              </div>
            </div>
          )}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
        </div>

        {/* Content */}
        <Container className="relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            {/* Eyebrow */}
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-fade-in-down">
              {siteConfig.tagline}
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
              {home?.frontmatter.heroTitle || "Transform Your Space Into Something Extraordinary"}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {home?.frontmatter.heroSubtitle || "Discover our curated collection of premium home décor and interior fittings. From modern minimalism to classic elegance, we bring your vision to life."}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                asChild
                href="/catalogue"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-white text-brand hover:bg-surface-50 hover:scale-105 transition-all duration-300 shadow-2xl"
                aria-label="Explore our catalogue"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explore Catalogue
                </span>
              </Button>
              <Button
                asChild
                href={whatsappUrl}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand transition-all duration-300 shadow-lg backdrop-blur-sm bg-white/10"
                aria-label="Contact us on WhatsApp"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp Us
                </span>
              </Button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile-Optimized Featured Products Section */}
      {featuredProducts.length > 0 && (
        <Section
          title="Featured Products"
          subtitle="Handpicked pieces that transform any space"
          className="py-16 md:py-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.slug} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard item={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              href="/catalogue"
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              View All Products
            </Button>
          </div>
        </Section>
      )}

      {/* Mobile-Optimized Recent Projects Section */}
      {recentProjects.length > 0 && (
        <Section
          title="Recent Projects"
          subtitle="See how we've transformed spaces with our design expertise"
          className="bg-surface-50 py-16 md:py-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recentProjects.map((project, index) => (
              <div 
                key={project.slug} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard item={project} />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              href="/projects"
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
            >
              View All Projects
            </Button>
          </div>
        </Section>
      )}

      {/* Mobile-First Features Section */}
      <Section
        title="Why Choose Samara H&H?"
        subtitle="We bring together quality, style, and functionality in every piece we offer"
        className="py-16 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-brand to-brand-fg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-ink-900 mb-4">Premium Quality</h3>
            <p className="text-ink-600 text-lg leading-relaxed">
              Every piece is carefully selected for its superior craftsmanship and materials.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-ink-900 mb-4">Modern Design</h3>
            <p className="text-ink-600 text-lg leading-relaxed">
              Stay ahead of trends with our contemporary and timeless design pieces.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-success to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-ink-900 mb-4">Easy Shopping</h3>
            <p className="text-ink-600 text-lg leading-relaxed">
              Seamless online experience with fast shipping and excellent customer service.
            </p>
          </div>
        </div>
      </Section>

      {/* Mobile-Optimized CTA Section */}
      <Section className="bg-gradient-to-r from-brand via-brand-fg to-brand-dark text-white relative overflow-hidden py-16 md:py-20">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="text-center relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Browse {siteConfig.name}'s extensive catalogue and find the perfect pieces to create your dream home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              href="/catalogue"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white text-brand hover:bg-surface-50 hover:scale-105 transition-all duration-300 shadow-xl"
              aria-label="Explore our catalogue"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore Our Catalogue
              </span>
            </Button>
            <Button
              asChild
              href={whatsappUrl}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand transition-all duration-300 shadow-lg backdrop-blur-sm bg-white/10"
              aria-label="Contact us on WhatsApp"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp Us
              </span>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}