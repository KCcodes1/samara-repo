import React from 'react';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { getPage } from '@/lib/pages';

export default async function ServicesPage() {
  const services = await getPage("services").catch(() => null);

  return (
    <Container className="py-12">
      <PageHeader
        title={services?.frontmatter.title || "Our Services"}
        subtitle={services?.frontmatter.description}
        className="text-center mb-12"
      />
      
      {services?.html && (
        <div 
          className="prose prose-lg max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: services.html }}
        />
      )}
    </Container>
  );
}
