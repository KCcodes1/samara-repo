import React from 'react';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { getPage } from '@/lib/pages';

export default async function AboutPage() {
  const about = await getPage("about").catch(() => null);

  return (
    <Container className="py-12">
      <PageHeader
        title={about?.frontmatter.title || "About Us"}
        subtitle={about?.frontmatter.description}
        className="text-center mb-12"
      />
      
      {about?.html && (
        <div 
          className="prose prose-lg max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: about.html }}
        />
      )}
    </Container>
  );
}
