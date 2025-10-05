// Default configuration - will be overridden by CMS data in components
export const defaultSiteConfig = {
  name: "Samara H&H",
  tagline: "Home décor & interior fittings",
  url: "https://example.com",
  address: "Nairobi, Kenya",
  phone: "+254 700 000000",
  email: "hello@example.com",
  socials: {
    instagram: "https://instagram.com/yourbrand",
    pinterest: "https://pinterest.com/yourbrand",
    tiktok: "https://tiktok.com/@yourbrand",
    facebook: "https://facebook.com/yourbrand",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" }
  ],
  whatsappCtaDefault: "Hi! I'm interested in your home décor and fittings.",
} as const;

// For backward compatibility, export as siteConfig
export const siteConfig = defaultSiteConfig;

export type SiteConfig = typeof siteConfig;
