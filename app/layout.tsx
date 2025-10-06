import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getSiteUrl } from '@/lib/siteUrl';
import { OrganizationLD } from '@/components/jsonld/OrganizationLD';
import { LocalBusinessLD } from '@/components/jsonld/LocalBusinessLD';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Samara Homes Kenya - Premium Interior Design & Home Décor in Nairobi, Mombasa, Kisumu, Meru',
    template: '%s | Samara Homes Kenya'
  },
  description: 'Transform your space with Samara Homes Kenya - premium interior design, curtains, tote bags, stools & home décor in Nairobi, Mombasa, Kisumu, Meru. Expert design services across Kenya.',
  keywords: [
    'Samara Homes Kenya',
    'Samara House Kenya',
    'Samara Decor Kenya', 
    'Samara Meru',
    'interior design Kenya',
    'home décor Kenya',
    'curtains Kenya',
    'tote bags Kenya',
    'stools Kenya',
    'Nairobi interior design',
    'Mombasa home décor',
    'Kisumu curtains',
    'Meru furniture',
    'Kenya interior design',
    'premium home décor Kenya',
    'interior design services Kenya',
    'home decoration Kenya',
    'custom curtains Kenya',
    'furniture Kenya',
    'decor accessories Kenya',
    'lunch bags Kenya',
    'weaved mats Kenya',
    'crochet bags Kenya',
    'decorative bags Kenya',
    'throw pillows Kenya',
    'baskets Kenya',
    'wooden stools Kenya',
    'bucket hats Kenya',
    'canvas bags Kenya',
    'curtain rods Kenya'
  ],
  authors: [{ name: 'Samara Homes Kenya' }],
  creator: 'Samara Homes Kenya',
  publisher: 'Samara Homes Kenya',
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
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: getSiteUrl(),
    siteName: 'Samara Homes Kenya',
    title: 'Samara Homes Kenya - Premium Interior Design & Home Décor',
    description: 'Transform your space with Samara Homes Kenya - premium interior design, curtains, tote bags, stools & home décor in Nairobi, Mombasa, Kisumu, Meru.',
    images: [
      {
        url: '/uploads/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Samara Homes Kenya - Premium Interior Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samara Homes Kenya - Premium Interior Design & Home Décor',
    description: 'Transform your space with Samara Homes Kenya - premium interior design, curtains, tote bags, stools & home décor in Kenya.',
    images: ['/uploads/hero.jpg'],
    creator: '@samarahomeskenya',
  },
  alternates: {
    canonical: getSiteUrl(),
  },
  category: 'Home & Garden',
  classification: 'Interior Design Services',
  other: {
    'geo.region': 'KE',
    'geo.placename': 'Kenya',
    'geo.position': '-1.2921;36.8219',
    'ICBM': '-1.2921, 36.8219',
    'DC.title': 'Samara Homes Kenya - Premium Interior Design & Home Décor',
    'DC.creator': 'Samara Homes Kenya',
    'DC.subject': 'Interior Design, Home Décor, Curtains, Furniture, Kenya',
    'DC.description': 'Premium interior design and home décor services in Kenya',
    'DC.publisher': 'Samara Homes Kenya',
    'DC.contributor': 'Samara Homes Kenya',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.identifier': getSiteUrl(),
    'DC.source': getSiteUrl(),
    'DC.language': 'en',
    'DC.relation': getSiteUrl(),
    'DC.coverage': 'Kenya',
    'DC.rights': 'Copyright Samara Homes Kenya',
  },
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
      <body className={`${inter.className} antialiased`}>
        <OrganizationLD />
        <LocalBusinessLD />
        {children}
      </body>
    </html>
  );
}
