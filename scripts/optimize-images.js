#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

class ImageOptimizer {
  constructor() {
    this.uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    this.sizes = {
      thumbnail: { width: 300, height: 300 },
      medium: { width: 600, height: 600 },
      large: { width: 1200, height: 1200 }
    };
  }

  async optimizeImage(inputPath, outputDir) {
    const filename = path.basename(inputPath, path.extname(inputPath));
    
    for (const [sizeName, dimensions] of Object.entries(this.sizes)) {
      const outputPath = path.join(outputDir, `${filename}-${sizeName}.webp`);
      
      await sharp(inputPath)
        .resize(dimensions.width, dimensions.height, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: 85 })
        .toFile(outputPath);
        
      console.log(`✅ Generated ${sizeName}: ${outputPath}`);
    }
  }

  async processAllImages() {
    if (!fs.existsSync(this.uploadsDir)) {
      console.log('❌ Uploads directory not found');
      return;
    }

    const images = fs.readdirSync(this.uploadsDir)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    for (const image of images) {
      const inputPath = path.join(this.uploadsDir, image);
      await this.optimizeImage(inputPath, this.uploadsDir);
    }

    console.log(`✅ Processed ${images.length} images`);
  }
}

// Run if called directly
if (require.main === module) {
  const optimizer = new ImageOptimizer();
  optimizer.processAllImages().catch(console.error);
}

module.exports = ImageOptimizer;
