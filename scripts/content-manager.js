#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Content management utilities
class ContentManager {
  constructor() {
    this.contentDir = path.join(process.cwd(), 'content');
  }

  // Create new product
  createProduct(data) {
    const template = `---
title: "${data.title}"
slug: "${data.slug}"
price: ${data.price || 0}
sku: "${data.sku || ''}"
categories: [${data.categories?.map(c => `"${c}"`).join(', ') || ''}]
tags: [${data.tags?.map(t => `"${t}"`).join(', ') || ''}]
dimensions: { "width": ${data.width || 0}, "height": ${data.height || 0} }
materials: [${data.materials?.map(m => `"${m}"`).join(', ') || ''}]
images:
  - "/uploads/${data.images?.[0] || 'placeholder.jpg'}"
featured: ${data.featured || false}
description: "${data.description || ''}"
date: "${new Date().toISOString().split('T')[0]}"
---

${data.content || 'Add product description here...'}
`;

    const filePath = path.join(this.contentDir, 'products', `${data.slug}.md`);
    fs.writeFileSync(filePath, template);
    console.log(`✅ Created product: ${data.slug}`);
  }

  // Create new project
  createProject(data) {
    const template = `---
title: "${data.title}"
slug: "${data.slug}"
cover: "/uploads/${data.cover || 'project-cover.jpg'}"
gallery:
  - "/uploads/${data.gallery?.[0] || 'project-1.jpg'}"
location: "${data.location || ''}"
style: "${data.style || ''}"
date: "${new Date().toISOString().split('T')[0]}"
---

${data.content || 'Add project description here...'}
`;

    const filePath = path.join(this.contentDir, 'projects', `${data.slug}.md`);
    fs.writeFileSync(filePath, template);
    console.log(`✅ Created project: ${data.slug}`);
  }

  // Validate content structure
  validateContent() {
    const issues = [];
    
    // Check products
    const productsDir = path.join(this.contentDir, 'products');
    if (fs.existsSync(productsDir)) {
      const products = fs.readdirSync(productsDir).filter(f => f.endsWith('.md') && f !== 'README.md');
      products.forEach(file => {
        const content = fs.readFileSync(path.join(productsDir, file), 'utf8');
        if (!content.includes('title:')) issues.push(`Product ${file} missing title`);
        if (!content.includes('slug:')) issues.push(`Product ${file} missing slug`);
        if (!content.includes('price:')) issues.push(`Product ${file} missing price`);
      });
    }

    if (issues.length > 0) {
      console.log('❌ Content validation issues:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('✅ All content is valid');
    }
  }

  // Generate content report
  generateReport() {
    const report = {
      products: 0,
      projects: 0,
      pages: 0,
      categories: 0
    };

    // Count products
    const productsDir = path.join(this.contentDir, 'products');
    if (fs.existsSync(productsDir)) {
      report.products = fs.readdirSync(productsDir).filter(f => f.endsWith('.md')).length;
    }

    // Count projects
    const projectsDir = path.join(this.contentDir, 'projects');
    if (fs.existsSync(projectsDir)) {
      report.projects = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md')).length;
    }

    // Count pages
    const pagesDir = path.join(this.contentDir, 'pages');
    if (fs.existsSync(pagesDir)) {
      report.pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md')).length;
    }

    // Count categories
    const categoriesFile = path.join(this.contentDir, 'categories', 'categories.json');
    if (fs.existsSync(categoriesFile)) {
      const categories = JSON.parse(fs.readFileSync(categoriesFile, 'utf8'));
      report.categories = categories.categories?.length || 0;
    }

    console.log('📊 Content Report:');
    console.log(`  Products: ${report.products}`);
    console.log(`  Projects: ${report.projects}`);
    console.log(`  Pages: ${report.pages}`);
    console.log(`  Categories: ${report.categories}`);
  }
}

// CLI interface
const manager = new ContentManager();
const command = process.argv[2];

switch (command) {
  case 'validate':
    manager.validateContent();
    break;
  case 'report':
    manager.generateReport();
    break;
  case 'create-product':
    const productData = {
      title: process.argv[3] || 'New Product',
      slug: process.argv[4] || 'new-product',
      price: parseInt(process.argv[5]) || 0,
      categories: process.argv[6]?.split(',') || ['uncategorized']
    };
    manager.createProduct(productData);
    break;
  case 'create-project':
    const projectData = {
      title: process.argv[3] || 'New Project',
      slug: process.argv[4] || 'new-project',
      location: process.argv[5] || '',
      style: process.argv[6] || ''
    };
    manager.createProject(projectData);
    break;
  default:
    console.log(`
Content Manager Usage:
  node scripts/content-manager.js validate          - Validate all content
  node scripts/content-manager.js report            - Generate content report
  node scripts/content-manager.js create-product "Title" "slug" price "cat1,cat2"
  node scripts/content-manager.js create-project "Title" "slug" "location" "style"
    `);
}
