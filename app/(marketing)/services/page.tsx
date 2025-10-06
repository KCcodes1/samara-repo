import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { getContactInfo, getServicesSettings } from '@/lib/settings';
import ContactForm from '@/components/ContactForm';

// Helper function to get icon based on icon string
function getServiceIcon(iconType: string) {
  const icons = {
    consultation: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
      </svg>
    ),
    'room-makeover': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    curtains: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    furniture: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    staging: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    ),
    maintenance: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };
  
  return icons[iconType as keyof typeof icons] || icons.consultation;
}

export default async function ServicesPage() {
  const contactInfo = await getContactInfo();
  const servicesSettings = await getServicesSettings();

  // Use CMS data instead of hardcoded data
  const serviceCards = servicesSettings.services;
  const processSteps = servicesSettings.processSteps;
  const testimonials = servicesSettings.testimonials;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-brand-50 to-brand-100">
        <div className="text-center max-w-4xl mx-auto">
          <PageHeader
            title={servicesSettings.hero.title}
            subtitle={servicesSettings.hero.subtitle}
            eyebrow="Our Services"
            className="mb-8"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={servicesSettings.hero.primaryButtonLink} variant="primary" size="lg">
              {servicesSettings.hero.primaryButtonText}
            </Button>
            <Button href={servicesSettings.hero.secondaryButtonLink} variant="outline" size="lg">
              {servicesSettings.hero.secondaryButtonText}
            </Button>
          </div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section title="Our Services" subtitle="Comprehensive design solutions for every space and budget">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-brand-200 group">
              <div className="flex items-center justify-center w-16 h-16 bg-brand-100 text-brand-600 rounded-xl mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                {getServiceIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-brand-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold text-brand-600">{service.price}</span>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Duration:</span> {service.duration}
                </div>
              </div>

              <Button variant="outline" size="md" className="w-full">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section className="bg-gray-50" title="How We Work" subtitle="Our proven 4-step process ensures exceptional results">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-600 text-white rounded-full text-xl font-bold mb-4">
                {step.step}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section title="What Our Clients Say" subtitle="Real stories from satisfied customers">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-brand-600 to-brand-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{servicesSettings.cta.title}</h2>
          <p className="text-xl text-brand-100 mb-8">
            {servicesSettings.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={servicesSettings.cta.primaryButtonLink} variant="outline" size="lg" className="bg-white text-brand-600 hover:bg-brand-50">
              {servicesSettings.cta.primaryButtonText}
            </Button>
            <Button href={servicesSettings.cta.secondaryButtonLink} variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-brand-600">
              {servicesSettings.cta.secondaryButtonText}
            </Button>
          </div>
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section title="Get In Touch" subtitle="Ready to start your project? We'd love to hear from you">
        <ContactForm contactInfo={contactInfo} />
      </Section>
    </div>
  );
}
