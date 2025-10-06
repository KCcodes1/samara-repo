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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
