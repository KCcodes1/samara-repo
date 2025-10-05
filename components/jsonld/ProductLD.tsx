export function ProductLD({
  name, images, description, sku, price, currency = "KES",
}: {
  name: string; 
  images: string[]; 
  description?: string; 
  sku?: string; 
  price?: number; 
  currency?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: images,
    description,
    sku,
    offers: price ? { 
      "@type": "Offer", 
      price, 
      priceCurrency: currency, 
      availability: "https://schema.org/InStock" 
    } : undefined,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
