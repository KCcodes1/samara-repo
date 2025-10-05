import { z } from 'zod';

// Content validation schemas
export const ProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  price: z.number().min(0, 'Price must be positive'),
  sku: z.string().optional(),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  tags: z.array(z.string()).optional(),
  dimensions: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    depth: z.number().optional(),
  }).optional(),
  materials: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  featured: z.boolean().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  cover: z.string().min(1, 'Cover image is required'),
  gallery: z.array(z.string()).min(1, 'At least one gallery image is required'),
  location: z.string().optional(),
  style: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const PageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  heroImage: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

// Validation functions
export function validateProduct(data: unknown) {
  return ProductSchema.safeParse(data);
}

export function validateProject(data: unknown) {
  return ProjectSchema.safeParse(data);
}

export function validatePage(data: unknown) {
  return PageSchema.safeParse(data);
}

// Content quality checks
export function checkContentQuality(content: string) {
  const issues: string[] = [];
  
  if (content.length < 50) {
    issues.push('Content is too short (minimum 50 characters)');
  }
  
  if (!content.includes('.')) {
    issues.push('Content should contain complete sentences');
  }
  
  if (content.split(' ').length < 10) {
    issues.push('Content should have at least 10 words');
  }
  
  return issues;
}

// SEO validation
export function validateSEO(data: { title?: string; description?: string; slug?: string }) {
  const issues: string[] = [];
  
  if (data.title && data.title.length > 60) {
    issues.push('Title should be under 60 characters for SEO');
  }
  
  if (data.description && data.description.length > 160) {
    issues.push('Description should be under 160 characters for SEO');
  }
  
  if (data.slug && data.slug.length > 50) {
    issues.push('Slug should be under 50 characters for SEO');
  }
  
  return issues;
}
