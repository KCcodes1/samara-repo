
export function LocalBusinessLD() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Samara Homes Kenya",
    "alternateName": ["Samara House Kenya", "Samara Decor Kenya", "Samara Meru"],
    "description": "Premium interior design and home décor services in Kenya. Expert design solutions for Nairobi, Mombasa, Kisumu, Meru. Specializing in curtains, tote bags, stools, and complete home decoration.",
    "url": "https://www.samarahomes.co.ke",
    "telephone": "+254-700-000000",
    "email": "hello@samarahomes.co.ke",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nairobi, Kenya",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-1.2921",
      "longitude": "36.8219"
    },
    "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-16:00",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Mobile Money",
    "currenciesAccepted": "KES",
    "areaServed": [
      {
        "@type": "City",
        "name": "Nairobi",
        "containedInPlace": {
          "@type": "Country",
          "name": "Kenya"
        }
      },
      {
        "@type": "City",
        "name": "Mombasa",
        "containedInPlace": {
          "@type": "Country",
          "name": "Kenya"
        }
      },
      {
        "@type": "City",
        "name": "Kisumu",
        "containedInPlace": {
          "@type": "Country",
          "name": "Kenya"
        }
      },
      {
        "@type": "City",
        "name": "Meru",
        "containedInPlace": {
          "@type": "Country",
          "name": "Kenya"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interior Design Services",
            "description": "Complete interior design and home décor services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Premium Curtains",
            "description": "Custom-made curtains for homes and offices"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Tote Bags",
            "description": "Stylish storage solutions for home organization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Elegant Stools",
            "description": "Premium seating solutions for any space"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Lunch Bags",
            "description": "Insulated food storage for work and school"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Weaved Mats",
            "description": "Traditional and modern floor coverings"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Crochet Bags",
            "description": "Handcrafted storage and decorative bags"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Decorative Bags",
            "description": "Stylish storage solutions for every room"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Throw Pillows",
            "description": "Comfortable and decorative cushions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Baskets",
            "description": "Traditional and modern storage baskets"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Wooden Stools",
            "description": "Handcrafted seating solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Bucket Hats",
            "description": "Stylish headwear for any occasion"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Canvas Bags",
            "description": "Durable storage and travel bags"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Curtain Rods",
            "description": "Complete window hardware solutions"
          }
        }
      ]
    },
    "sameAs": [
      "https://instagram.com/samarahomeskenya",
      "https://pinterest.com/samarahomeskenya",
      "https://tiktok.com/@samarahomeskenya",
      "https://facebook.com/samarahomeskenya"
    ],
    "keywords": [
      "Samara Homes Kenya",
      "Samara House Kenya",
      "Samara Decor Kenya",
      "Samara Meru",
      "interior design Kenya",
      "home décor Kenya",
      "curtains Kenya",
      "tote bags Kenya",
      "stools Kenya",
      "lunch bags Kenya",
      "weaved mats Kenya",
      "crochet bags Kenya",
      "decorative bags Kenya",
      "throw pillows Kenya",
      "baskets Kenya",
      "wooden stools Kenya",
      "bucket hats Kenya",
      "canvas bags Kenya",
      "curtain rods Kenya",
      "Nairobi interior design",
      "Mombasa home décor",
      "Kisumu curtains",
      "Meru furniture",
      "Kenya interior design",
      "premium home décor Kenya"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema, null, 2),
      }}
    />
  );
}
