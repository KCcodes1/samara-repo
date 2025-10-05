'use client';

import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Container } from './Container';
import { NavLink } from './NavLink';
import { Button } from './Button';
import { MobileMenu } from './MobileMenu';
import { siteConfig } from '@/config/site';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(siteConfig.whatsappCtaDefault)}`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface-0/80 backdrop-blur-md shadow-soft border-b border-surface-200">
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <BrandLogo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {siteConfig.nav.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                asChild
                href="/catalogue"
                variant="outline"
                size="sm"
                aria-label="View our catalogue"
              >
                View Catalogue
              </Button>
              <Button
                asChild
                href={whatsappUrl}
                variant="primary"
                size="sm"
                aria-label="Contact us on WhatsApp"
              >
                WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-ink-600 hover:text-brand hover:bg-surface-100 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navItems={siteConfig.nav}
        whatsappUrl={whatsappUrl}
      />
    </>
  );
};
