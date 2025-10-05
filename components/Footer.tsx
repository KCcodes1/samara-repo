import React from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { BrandLogo } from './BrandLogo';
import { SocialIcons } from './SocialIcons';
import { siteConfig } from '@/config/site';
import { getContactInfo } from '@/lib/settings';

export const Footer: React.FC = async () => {
  const contactInfo = await getContactInfo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-surface-0">
      <Container>
        <div className="py-12">
          {/* Social Proof Section */}
          <div className="text-center mb-8 pb-8 border-b border-ink-700">
            <p className="text-ink-400 text-sm mb-4">As seen on</p>
            <div className="flex justify-center items-center space-x-8 text-ink-500">
              <span className="text-sm font-medium">Instagram</span>
              <span className="text-ink-600">•</span>
              <span className="text-sm font-medium">Pinterest</span>
              <span className="text-ink-600">•</span>
              <span className="text-sm font-medium">Facebook</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About/Brand Column */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <BrandLogo className="text-surface-0 mb-4" />
              <p className="text-ink-400 max-w-md leading-relaxed">
                Transform your space with {contactInfo.companyName} premium home décor and interior 
                fittings collection. Quality craftsmanship meets modern design.
              </p>
              <div className="mt-6">
                <SocialIcons socials={contactInfo.socials} className="text-ink-400" size="sm" />
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-surface-0">Quick Links</h3>
              <ul className="space-y-3">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ink-400 hover:text-surface-0 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-surface-0">Contact</h3>
              <div className="space-y-3 text-ink-400">
                <div>
                  <p className="font-medium text-surface-0 mb-1">Address</p>
                  <p>{contactInfo.address}</p>
                </div>
                <div>
                  <p className="font-medium text-surface-0 mb-1">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-surface-0 transition-colors duration-200"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div>
                  <p className="font-medium text-surface-0 mb-1">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-surface-0 transition-colors duration-200"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-surface-0">Follow Us</h3>
              <p className="text-ink-400 mb-4">
                Stay updated with our latest designs and inspirations.
              </p>
              <SocialIcons socials={contactInfo.socials} className="text-ink-400" size="md" />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-ink-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-ink-400 text-sm">
                &copy; {currentYear} {contactInfo.companyName}. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-ink-400 hover:text-surface-0 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-ink-400 hover:text-surface-0 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
