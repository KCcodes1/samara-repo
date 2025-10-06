import React from 'react';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { getAllProjects } from '@/lib/projects';
import { getProjectsSettings } from '@/lib/projects-settings';
import ProjectCard from '@/components/cards/ProjectCard';
import { ProjectFilters } from '@/components/filters/ProjectFilters';
import { ProjectStats } from '@/components/ProjectStats';

export default async function ProjectsPage() {
  const projects = await getAllProjects().catch(() => []);
  const settings = await getProjectsSettings();

  // Extract unique values for filters
  const locations = Array.from(new Set(projects.map(p => p.location).filter((loc): loc is string => Boolean(loc))));
  const styles = Array.from(new Set(projects.map(p => p.style).filter((style): style is string => Boolean(style))));
  const years = Array.from(new Set(projects.map(p => p.date ? new Date(p.date).getFullYear() : null).filter((year): year is number => year !== null))).sort((a, b) => b - a);

  return (
    <Container className="py-12">
      <PageHeader
        title={settings.hero.title}
        subtitle={settings.hero.subtitle}
        className="text-center mb-16"
      />

      {/* Project Statistics */}
      <ProjectStats projects={projects} />

      {/* Filter Section */}
      <div className="mb-12">
        <ProjectFilters 
          locations={locations}
          styles={styles}
          years={years}
          totalProjects={projects.length}
        />
      </div>
      
      {/* Projects Grid with Enhanced Layout */}
      {projects.length > 0 ? (
        <div className="space-y-8">
          {/* Featured Projects Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {settings.featuredSection.title}
            </h2>
            {settings.featuredSection.description && (
              <p className="text-ink-600 mb-6">{settings.featuredSection.description}</p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {projects.slice(0, 2).map((project) => (
                <div key={project.slug} className="group">
                  <ProjectCard item={project} featured={true} />
                </div>
              ))}
            </div>
          </section>

          {/* All Projects Section */}
          <section>
            <h2 className="text-2xl font-bold text-ink-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {settings.allProjectsSection.title}
            </h2>
            {settings.allProjectsSection.description && (
              <p className="text-ink-600 mb-6">{settings.allProjectsSection.description}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <div 
                  key={project.slug} 
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard item={project} />
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 text-center bg-gradient-to-br from-brand-soft/30 via-surface-50 to-accent-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-ink-900 mb-4">{settings.cta.title}</h3>
            <p className="text-ink-600 mb-6 max-w-2xl mx-auto">
              {settings.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-fg transition-all duration-300 hover:scale-105 shadow-soft hover:shadow-soft-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Start Your Project
              </a>
              <a 
                href="/services" 
                className="inline-flex items-center px-6 py-3 border-2 border-brand text-brand font-semibold rounded-lg hover:bg-brand hover:text-white transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Our Services
              </a>
            </div>
          </section>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 mx-auto text-ink-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xl font-semibold text-ink-900 mb-2">{settings.emptyState.title}</h3>
            <p className="text-ink-600 mb-6">{settings.emptyState.description}</p>
            <a 
              href={settings.emptyState.buttonLink} 
              className="inline-flex items-center px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-fg transition-all duration-300"
            >
              {settings.emptyState.buttonText}
            </a>
          </div>
        </div>
      )}
    </Container>
  );
}
