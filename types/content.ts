export type Dimensions = {
  width?: number;
  height?: number;
  depth?: number;
};

export type ProductFrontmatter = {
  title: string;
  slug: string;
  price?: number;
  sku?: string;
  categories?: string[];
  tags?: string[];
  dimensions?: Dimensions;
  materials?: string[];
  images?: string[];
  featured?: boolean;
  description?: string; // optional short summary
  date?: string;        // ISO for sorting if needed
};

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  cover?: string;
  gallery?: string[];
  location?: string;
  style?: string;
  date?: string;
};

export type PageFrontmatter = {
  title: string;
  slug: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  description?: string;
};
