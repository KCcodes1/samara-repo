import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ProgressBar } from '@/components/ProgressBar';
import { siteConfig } from '@/config/site';
import { getContactInfo } from '@/lib/settings';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: ['home décor', 'interior design', 'furniture', 'home accessories', 'Kenya'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactInfo = await getContactInfo();
  
  return (
    <div className="min-h-screen flex flex-col">
      <ProgressBar />
      <Header contactInfo={contactInfo} />
      <main className="flex-1">{children}</main>
      <Footer contactInfo={contactInfo} />
      <ScrollToTop />
    </div>
  );
}
