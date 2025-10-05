import React from 'react';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { getAllProjects } from '@/lib/projects';
import ProjectCard from '@/components/cards/ProjectCard';

export default async function ProjectsPage() {
  const projects = await getAllProjects().catch(() => []);

  return (
    <Container className="py-12">
      <PageHeader
        title="Projects"
        subtitle="Explore our portfolio of completed interior design projects"
        className="text-center mb-12"
      />
      
      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} item={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-ink-600">No projects available at the moment.</p>
        </div>
      )}
    </Container>
  );
}
