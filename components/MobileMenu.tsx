'use client';

import React, { useEffect, useRef } from 'react';
import { NavLink } from './NavLink';
import { Button } from './Button';

interface NavItem {
  readonly label: string;
  readonly href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
  whatsappUrl: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  whatsappUrl,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus first focusable element when menu opens
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle route change
  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };

    // Listen for route changes (Next.js router events)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Menu Panel with slide-in animation */}
      <div
        ref={menuRef}
        className="relative bg-white shadow-2xl border-b border-surface-200 animate-slide-in-right"
        style={{ animationDuration: '0.3s' }}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200">
          <h2 className="text-lg font-semibold text-ink-900">Menu</h2>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="p-2 rounded-lg text-ink-600 hover:text-brand hover:bg-surface-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Navigation Links with enhanced styling */}
          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="block text-lg font-medium py-3 px-4 rounded-xl hover:bg-surface-100 hover:text-brand transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Enhanced CTAs */}
          <div className="pt-6 border-t border-surface-200 space-y-4">
            <Button
              asChild
              href="/catalogue"
              variant="outline"
              size="lg"
              className="w-full hover:scale-105 transition-transform duration-200"
              aria-label="View our catalogue"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                View Catalogue
              </span>
            </Button>
            <Button
              asChild
              href={whatsappUrl}
              variant="primary"
              size="lg"
              className="w-full hover:scale-105 transition-transform duration-200"
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

          {/* Contact info */}
          <div className="pt-4 border-t border-surface-200">
            <div className="text-center text-sm text-ink-600">
              <p className="mb-2">Need help? Contact us:</p>
              <div className="flex justify-center space-x-4">
                <a 
                  href={`tel:${whatsappUrl.split('wa.me/')[1]?.split('?')[0]}`}
                  className="text-brand hover:text-brand-fg transition-colors"
                >
                  Call Now
                </a>
                <a 
                  href={whatsappUrl}
                  className="text-brand hover:text-brand-fg transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
