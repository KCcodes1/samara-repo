import React, { Suspense } from 'react';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { getAllProducts, getCategories } from '@/lib/products';
import CatalogueClient from '@/components/CatalogueClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Explore our home décor catalogue.",
};

export default async function CataloguePage() {
  const [products, categories] = await Promise.all([
    getAllProducts().catch(() => []),
    getCategories()
  ]);

  return (
    <Container className="py-12">
      <PageHeader
        title="Catalogue"
        subtitle="Explore our complete collection of home décor and interior fittings"
        className="text-center mb-12"
      />
      
      <Suspense fallback={<div className="text-center py-12">Loading catalogue...</div>}>
        <CatalogueClient products={products} categories={categories} />
      </Suspense>
    </Container>
  );
}
