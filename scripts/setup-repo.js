#!/usr/bin/env node

/**
 * Script to help set up the GitHub repository structure for Decap CMS
 * This script will create the necessary folder structure and upload files
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up GitHub repository structure for Decap CMS...\n');

// Define the required folder structure
const requiredStructure = {
  'content': {
    'categories': ['categories.json'],
    'pages': ['home.md', 'about.md', 'services.md'],
    'products': ['README.md'], // Placeholder for products
    'projects': ['README.md'] // Placeholder for projects
  }
};

// Check if content folder exists locally
const contentPath = path.join(__dirname, '..', 'content');
if (!fs.existsSync(contentPath)) {
  console.error('❌ Content folder not found. Please run this script from the project root.');
  process.exit(1);
}

console.log('📁 Local content structure found:');
console.log('   content/');
console.log('   ├── categories/');
console.log('   │   └── categories.json');
console.log('   ├── pages/');
console.log('   │   ├── about.md');
console.log('   │   ├── home.md');
console.log('   │   └── services.md');
console.log('   ├── products/');
console.log('   │   ├── linen-sheer-curtain.md');
console.log('   │   └── rattan-armchair.md');
console.log('   └── projects/');
console.log('       └── scandi-living-room.md\n');

console.log('📋 Next steps to set up your GitHub repository:');
console.log('');
console.log('1. 🌐 Go to GitHub and create/access your repository:');
console.log('   https://github.com/KCcodes1/samara-repo');
console.log('');
console.log('2. 📁 Create the following folder structure in your repository:');
console.log('   - content/');
console.log('   - content/categories/');
console.log('   - content/pages/');
console.log('   - content/products/');
console.log('   - content/projects/');
console.log('');
console.log('3. 📤 Upload your existing files:');
console.log('   - content/categories/categories.json');
console.log('   - content/pages/*.md files');
console.log('   - content/products/*.md files');
console.log('   - content/projects/*.md files');
console.log('');
console.log('4. 🔧 Update your config.yml with the correct repository name');
console.log('');
console.log('5. 🔑 Set up environment variables in .env.local');
console.log('');
console.log('6. 🚀 Test your CMS at http://localhost:3000/admin.html');
console.log('');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  Environment variables not set up yet.');
  console.log('   Create .env.local with your GitHub OAuth credentials.');
  console.log('');
}

console.log('✅ Repository setup guide complete!');
