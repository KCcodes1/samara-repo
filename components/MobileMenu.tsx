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
      className="fixed inset-0 z-40 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="relative bg-white shadow-soft-xl border-b border-gray-200"
      >
        <div className="px-4 py-6 space-y-6">
          {/* Navigation Links */}
          <nav className="space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="block text-lg font-medium py-2"
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTAs */}
          <div className="pt-6 border-t border-gray-200 space-y-4">
            <Button
              asChild
              href="/catalogue"
              variant="outline"
              size="md"
              className="w-full"
              aria-label="View our catalogue"
            >
              View Catalogue
            </Button>
            <Button
              asChild
              href={whatsappUrl}
              variant="primary"
              size="md"
              className="w-full"
              aria-label="Contact us on WhatsApp"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
