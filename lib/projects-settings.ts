import { readFile } from './fs-helpers';
import { joinContent } from './fs-helpers';

export interface ProjectsSettings {
  hero: {
    title: string;
    subtitle: string;
  };
  featuredSection: {
    title: string;
    description?: string;
  };
  allProjectsSection: {
    title: string;
    description?: string;
  };
  emptyState: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  cta: {
    title: string;
    description: string;
    backgroundImage?: string;
  };
}

export async function getProjectsSettings(): Promise<ProjectsSettings> {
  try {
    const filePath = joinContent('settings/projects.json');
    const raw = readFile(filePath);
    return JSON.parse(raw);
  } catch (error) {
    // Return default settings if file doesn't exist
    return {
      hero: {
        title: "Our Projects",
        subtitle: "Discover our portfolio of exceptional interior design transformations"
      },
      featuredSection: {
        title: "Featured Projects",
        description: "Showcasing our most outstanding design achievements"
      },
      allProjectsSection: {
        title: "All Projects",
        description: "Explore our complete portfolio of interior design projects"
      },
      emptyState: {
        title: "No Projects Yet",
        description: "We're working on adding our amazing projects to showcase our work. Check back soon!",
        buttonText: "Get in Touch",
        buttonLink: "/contact"
      },
      cta: {
        title: "Ready to Start Your Project?",
        description: "Let us transform your space into something extraordinary. Get in touch to discuss your vision.",
        backgroundImage: ""
      }
    };
  }
}
