import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getSiteUrl } from '@/lib/siteUrl';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: 'Samara House & Homes - Premium Home Décor & Interior Fittings',
  description: 'Transform your space with Samara House & Homes premium home décor and interior fittings collection.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#D4AF37" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
