#!/usr/bin/env node

/**
 * SEO Testing Script for Samara Homes Kenya
 * Run this script to test basic SEO elements
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 SEO Testing Script for Samara Homes Kenya');
console.log('==============================================\n');

// Test 1: Check if sitemap exists and is valid
function testSitemap() {
  console.log('1. Testing Sitemap...');
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Check for key pages
    const keyPages = [
      'samarahomes.co.ke/',
      'samarahomes.co.ke/about',
      'samarahomes.co.ke/services',
      'samarahomes.co.ke/catalogue',
      'samarahomes.co.ke/catalogue/blue-curtains',
      'samarahomes.co.ke/catalogue/lunch-bags',
      'samarahomes.co.ke/catalogue/weaved-mats'
    ];
    
    let foundPages = 0;
    keyPages.forEach(page => {
      if (sitemapContent.includes(page)) {
        foundPages++;
        console.log(`   ✅ Found: ${page}`);
      } else {
        console.log(`   ❌ Missing: ${page}`);
      }
    });
    
    console.log(`   📊 Found ${foundPages}/${keyPages.length} key pages in sitemap\n`);
  } else {
    console.log('   ❌ Sitemap not found!\n');
  }
}

// Test 2: Check robots.txt
function testRobots() {
  console.log('2. Testing Robots.txt...');
  const robotsPath = path.join(__dirname, '../public/robots.txt');
  
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    
    if (robotsContent.includes('Sitemap:')) {
      console.log('   ✅ Sitemap reference found');
    } else {
      console.log('   ❌ Sitemap reference missing');
    }
    
    if (robotsContent.includes('Allow: /')) {
      console.log('   ✅ Allow directive found');
    } else {
      console.log('   ❌ Allow directive missing');
    }
    
    console.log('   ✅ Robots.txt exists\n');
  } else {
    console.log('   ❌ Robots.txt not found!\n');
  }
}

// Test 3: Check for SEO-optimized content files
function testContentFiles() {
  console.log('3. Testing Content Files...');
  
  const contentDir = path.join(__dirname, '../content');
  const productDir = path.join(__dirname, '../content/products');
  
  // Check if content directories exist
  if (fs.existsSync(contentDir)) {
    console.log('   ✅ Content directory exists');
  } else {
    console.log('   ❌ Content directory missing');
  }
  
  if (fs.existsSync(productDir)) {
    console.log('   ✅ Products directory exists');
    
    // Count product files
    const productFiles = fs.readdirSync(productDir).filter(file => file.endsWith('.md'));
    console.log(`   📊 Found ${productFiles.length} product files`);
    
    // Check for new product categories
    const newProducts = [
      'lunch-bags.md',
      'weaved-mats.md',
      'crochet-bags.md',
      'decorative-bags.md',
      'throw-pillows.md',
      'baskets.md',
      'wooden-stools.md',
      'bucket-hats.md',
      'canvas-bags.md',
      'curtain-rods.md'
    ];
    
    let foundNewProducts = 0;
    newProducts.forEach(product => {
      if (fs.existsSync(path.join(productDir, product))) {
        foundNewProducts++;
        console.log(`   ✅ ${product}`);
      } else {
        console.log(`   ❌ ${product}`);
      }
    });
    
    console.log(`   📊 Found ${foundNewProducts}/${newProducts.length} new product files\n`);
  } else {
    console.log('   ❌ Products directory missing\n');
  }
}

// Test 4: Check for JSON-LD structured data
function testStructuredData() {
  console.log('4. Testing Structured Data...');
  
  const jsonldDir = path.join(__dirname, '../components/jsonld');
  
  if (fs.existsSync(jsonldDir)) {
    console.log('   ✅ JSON-LD components directory exists');
    
    const jsonldFiles = fs.readdirSync(jsonldDir).filter(file => file.endsWith('.tsx'));
    console.log(`   📊 Found ${jsonldFiles.length} JSON-LD components`);
    
    jsonldFiles.forEach(file => {
      console.log(`   ✅ ${file}`);
    });
    
    console.log('');
  } else {
    console.log('   ❌ JSON-LD components directory missing\n');
  }
}

// Test 5: Check for SEO keywords in content
function testKeywords() {
  console.log('5. Testing SEO Keywords...');
  
  const targetKeywords = [
    'Samara Homes Kenya',
    'Samara House Kenya',
    'Samara Decor Kenya',
    'Samara Meru',
    'interior design Kenya',
    'home décor Kenya',
    'curtains Kenya',
    'tote bags Kenya',
    'stools Kenya',
    'Nairobi interior design',
    'Mombasa home décor',
    'Kisumu curtains',
    'Meru furniture'
  ];
  
  // Check site config
  const configPath = path.join(__dirname, '../config/site.ts');
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    let foundKeywords = 0;
    targetKeywords.forEach(keyword => {
      if (configContent.includes(keyword)) {
        foundKeywords++;
        console.log(`   ✅ "${keyword}" found in site config`);
      } else {
        console.log(`   ❌ "${keyword}" missing from site config`);
      }
    });
    
    console.log(`   📊 Found ${foundKeywords}/${targetKeywords.length} keywords in site config\n`);
  } else {
    console.log('   ❌ Site config not found\n');
  }
}

// Run all tests
function runAllTests() {
  testSitemap();
  testRobots();
  testContentFiles();
  testStructuredData();
  testKeywords();
  
  console.log('🎯 SEO Testing Complete!');
  console.log('========================');
  console.log('Next steps:');
  console.log('1. Run "npm run dev" to test locally');
  console.log('2. Visit http://localhost:3000');
  console.log('3. Use browser dev tools to inspect meta tags');
  console.log('4. Test with Google PageSpeed Insights');
  console.log('5. Submit sitemap to Google Search Console');
  console.log('6. Monitor rankings and traffic over time');
}

// Execute tests
runAllTests();
