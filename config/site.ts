// Default configuration - will be overridden by CMS data in components
export const defaultSiteConfig = {
  name: "Samara Homes & Decor",
  tagline: "Premium Home Décor & Interior Design in Kenya",
  url: "https://www.samarahomes.co.ke",
  address: "Nairobi, Kenya",
  phone: "+254 700 000000",
  email: "hello@samarahomes.co.ke",
  socials: {
    instagram: "https://instagram.com/samarahomeskenya",
    pinterest: "https://pinterest.com/samarahomeskenya",
    tiktok: "https://tiktok.com/@samarahomeskenya",
    facebook: "https://facebook.com/samarahomeskenya",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" }
  ],
  whatsappCtaDefault: "Hi! I'm interested in your home décor, curtains, and interior design services in Kenya.",
  // SEO Keywords for Kenyan market
  keywords: [
    "Samara Homes Kenya",
    "Samara House Kenya", 
    "Samara Decor Kenya",
    "Samara Meru",
    "interior design Kenya",
    "home décor Kenya",
    "curtains Kenya",
    "tote bags Kenya",
    "stools Kenya",
    "decor Kenya",
    "Nairobi interior design",
    "Mombasa home décor",
    "Kisumu curtains",
    "Meru furniture",
    "Kenya interior design",
    "premium home décor Kenya",
    "lunch bags Kenya",
    "weaved mats Kenya",
    "crochet bags Kenya",
    "decorative bags Kenya",
    "throw pillows Kenya",
    "baskets Kenya",
    "wooden stools Kenya",
    "bucket hats Kenya",
    "canvas bags Kenya",
    "curtain rods Kenya"
  ],
  // Local SEO for Kenyan cities
  serviceAreas: [
    "Nairobi", "Mombasa", "Kisumu", "Meru", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", "Garissa"
  ],
  // Business categories for local SEO
  businessCategories: [
    "Interior Design Services",
    "Home Décor Store", 
    "Curtains & Blinds",
    "Furniture Store",
    "Home Accessories",
    "Storage Solutions",
    "Fashion Accessories",
    "Handcrafted Items",
    "Traditional Crafts",
    "Window Hardware"
  ]
} as const;

// For backward compatibility, export as siteConfig
export const siteConfig = defaultSiteConfig;

export type SiteConfig = typeof siteConfig;
