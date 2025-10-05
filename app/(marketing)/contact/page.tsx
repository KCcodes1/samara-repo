import React from 'react';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { getContactInfo } from '@/lib/settings';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage() {
  const contactInfo = await getContactInfo();

  return (
    <Container className="py-12">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries, consultations, or to discuss your project"
        className="text-center mb-12"
      />

      <ContactForm contactInfo={contactInfo} />
    </Container>
  );
}
