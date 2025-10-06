import React from 'react';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { getPage } from '@/lib/pages';
import { getAboutSettings } from '@/lib/settings';
import Image from 'next/image';
import { Button } from '@/components/Button';

export default async function AboutPage() {
  const about = await getPage("about").catch(() => null);
  const aboutSettings = await getAboutSettings();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-soft via-surface-50 to-accent-50">
        <Container className="relative z-10">
          <PageHeader
            title={about?.frontmatter.title || "About Us"}
            subtitle={about?.frontmatter.description}
            className="text-center mb-16"
          />
          
          {/* Hero Image */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-soft-xl mb-16">
            <Image
              src={about?.frontmatter.heroImage || "/uploads/hero.jpg"}
              alt="Beautiful interior design showcase"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-16">
        {about?.html && (
          <div 
            className="prose prose-lg max-w-none mx-auto prose-basic"
            dangerouslySetInnerHTML={{ __html: about.html }}
          />
        )}
      </Container>

      {/* Statistics Section */}
      <section className="py-16 bg-surface-50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-brand">{aboutSettings.statistics.projectsCompleted}</div>
              <div className="text-ink-600">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-brand">{aboutSettings.statistics.yearsExperience}</div>
              <div className="text-ink-600">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-brand">{aboutSettings.statistics.clientSatisfaction}</div>
              <div className="text-ink-600">Client Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-brand">{aboutSettings.statistics.teamMembers}</div>
              <div className="text-ink-600">Team Members</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-ink-600 max-w-2xl mx-auto">
              Our passionate team of designers and craftsmen work together to bring your vision to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {aboutSettings.team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-soft-xl group-hover:shadow-glow transition-all duration-300">
                  <Image
                    src={member.image || "/uploads/hero.jpg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-ink-900 mb-2">{member.name}</h3>
                <p className="text-brand font-medium mb-2">{member.role}</p>
                <p className="text-ink-600 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-surface-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-ink-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from our satisfied clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutSettings.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-surface-0 p-6 rounded-xl shadow-soft-xl">
                <div className="flex items-center mb-4">
                  <div className="flex text-brand">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-ink-700 mb-4 italic">
                  &ldquo;{testimonial.testimonial}&rdquo;
                </p>
                <div className="font-semibold text-ink-900">{testimonial.name}</div>
                <div className="text-sm text-ink-600">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand to-brand-light">
        <Container>
          <div className="text-center text-surface-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{aboutSettings.cta.title}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              {aboutSettings.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/contact" 
                variant="outline"
                className="bg-surface-0 text-brand border-surface-0 hover:bg-surface-50 hover:text-brand-fg font-semibold"
                asChild
              >
                Get Free Consultation
              </Button>
              <Button 
                href="/catalogue" 
                variant="outline"
                className="bg-surface-0 border-2 border-surface-0 text-brand hover:bg-brand-soft hover:text-brand-fg font-semibold"
                asChild
              >
                View Our Work
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
