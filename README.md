# Samara House & Homes

A modern, responsive home décor and interior fittings website for Samara House & Homes, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🔧 TypeScript with strict mode
- 🧹 ESLint + Prettier for code quality
- 🚀 Optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd samara-house-homes
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

The project is compatible with any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Project Structure

```
samara-house-homes/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages group
│   │   ├── layout.tsx     # Marketing layout
│   │   └── page.tsx       # Home page
│   ├── api/               # API routes
│   │   └── decap/         # Decap CMS OAuth proxy
│   │       ├── auth/      # OAuth initiation
│   │       └── callback/  # OAuth callback
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── BrandLogo.tsx      # Logo component
│   └── Container.tsx      # Container wrapper
├── content/               # Git-based content layer
│   ├── pages/             # Page content (Markdown)
│   ├── products/          # Product catalog (Markdown)
│   ├── projects/          # Project portfolio (Markdown)
│   └── categories/        # Category definitions (JSON)
├── lib/                   # Content loaders and utilities
│   ├── fs-helpers.ts      # File system helpers
│   ├── md.ts              # Markdown parsing utilities
│   ├── pages.ts           # Page content loader
│   ├── products.ts        # Product content loader
│   └── projects.ts        # Project content loader
├── types/                 # TypeScript type definitions
│   └── content.ts         # Content type definitions
├── public/                # Static assets
│   ├── admin/             # Decap CMS admin interface
│   │   ├── index.html     # CMS admin UI
│   │   └── config.yml     # CMS configuration
│   ├── uploads/           # Image uploads
│   ├── robots.txt         # SEO robots file
│   └── sitemap.xml        # SEO sitemap
└── styles/                # Future style tokens
```

## Customization

### Branding

- **Colors**: Update the primary color palette in `tailwind.config.ts`
- **Logo**: Replace the SVG in `components/BrandLogo.tsx` (currently shows "Samara H&H")
- **Typography**: Modify font settings in `app/layout.tsx`

### Navigation

- **Header Links**: Update navigation in `app/(marketing)/layout.tsx`
- **Footer Links**: Modify footer links in the same file

### Content

- **Home Page**: Edit `app/(marketing)/page.tsx`
- **SEO**: Update metadata in `app/layout.tsx`

## Content Management

This project uses a Git-based content layer with Decap CMS for easy content editing. All content is stored in the `/content` directory as Markdown files with frontmatter.

### Decap CMS (GitHub Backend)

The site includes a fully integrated Decap CMS admin interface accessible at `/admin`. This provides a user-friendly interface for content editors to manage products, projects, and pages without needing to edit Markdown files directly.

#### Setup Instructions

1. **Create GitHub OAuth App**:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create a new OAuth App with:
     - **Homepage URL**: `http://localhost:3000` (for dev) or your production domain
     - **Authorization callback URL**: `http://localhost:3000/api/decap/callback` (for dev) or your production domain + `/api/decap/callback`

2. **Configure Environment Variables**:
   - Copy `.env.example` to `.env.local`
   - Add your GitHub OAuth App credentials:
     ```env
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     GITHUB_CLIENT_ID=your_github_oauth_app_client_id
     GITHUB_CLIENT_SECRET=your_github_oauth_app_client_secret
     ```

3. **Update CMS Configuration**:
   - Edit `public/admin/config.yml`
   - Replace `YOUR_GITHUB_USERNAME_OR_ORG/YOUR_REPO_NAME` with your actual GitHub repository
   - Update `base_url` to match your site URL

4. **Access the Admin Interface**:
   - Run `npm run dev`
   - Navigate to `http://localhost:3000/admin`
   - Click "Login with GitHub" to authenticate
   - Start editing content through the CMS interface

#### Important Notes

- All editors must have **push access** to the GitHub repository
- Content changes are committed directly to the repository
- For production deployments, ensure `NEXT_PUBLIC_SITE_URL` is set to your production domain
- The CMS uses editorial workflow by default - content is saved as drafts before publishing

### Content Structure

- **Pages** (`/content/pages/`): Static page content (home, about, services)
- **Products** (`/content/products/`): Product catalog with pricing, categories, and specifications
- **Projects** (`/content/projects/`): Portfolio projects with galleries and descriptions
- **Categories** (`/content/categories/`): Product category definitions

### Adding New Content

#### Adding a New Product

1. Create a new `.md` file in `/content/products/`
2. Use the following frontmatter structure:

```yaml
---
title: "Product Name"
slug: "product-slug"
price: 5000
sku: "PROD-001"
categories: ["category-slug"]
tags: ["tag1", "tag2"]
dimensions: { "width": 100, "height": 200, "depth": 50 }
materials: ["material1", "material2"]
images:
  - "/uploads/image1.jpg"
  - "/uploads/image2.jpg"
featured: true
description: "Short product description"
date: "2025-01-01"
---

Your product description in Markdown format.
```

#### Adding a New Project

1. Create a new `.md` file in `/content/projects/`
2. Use the following frontmatter structure:

```yaml
---
title: "Project Name"
slug: "project-slug"
cover: "/uploads/project-cover.jpg"
gallery:
  - "/uploads/project-1.jpg"
  - "/uploads/project-2.jpg"
location: "Location"
style: "Design Style"
date: "2025-01-01"
---

Your project description in Markdown format.
```

#### Adding a New Category

1. Edit `/content/categories/categories.json`
2. Add a new category object:

```json
{
  "slug": "new-category",
  "title": "New Category Name"
}
```

### Content Loaders

The project includes TypeScript loaders that parse Markdown files and provide type-safe access to content:

- `getAllProducts()` - Returns all products with frontmatter
- `getProductBySlug(slug)` - Returns a specific product with rendered HTML
- `getAllProjects()` - Returns all projects with frontmatter
- `getProjectBySlug(slug)` - Returns a specific project with rendered HTML
- `getPage(slug)` - Returns page content (home, about, services)
- `getCategories()` - Returns all product categories

## Content Editing

Content can be edited directly by modifying the Markdown files in the `/content` directory. The site will automatically reflect changes when the development server is running.

All content is stored in Git and parsed at build time for optimal performance:
- **Pages** (`/content/pages/`): Static page content
- **Products** (`/content/products/`): Product catalog with frontmatter
- **Projects** (`/content/projects/`): Portfolio projects with galleries
- **Categories** (`/content/categories/`): Product category definitions

**Note**: No runtime database is needed - all content is stored in Git and parsed at build time for optimal performance.

## Future Enhancements

The following routes are placeholder and ready for implementation:
- `/catalogue` - Product catalog page
- `/about` - About us page
- `/contact` - Contact page
- `/help` - Help center
- `/shipping` - Shipping information
- `/returns` - Returns policy

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Linting**: ESLint + Prettier
- **Deployment**: Vercel-ready

## License

This project is licensed under the MIT License.
