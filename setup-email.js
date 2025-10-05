#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📧 Email Setup for Samara H&H Contact Form');
console.log('==========================================\n');

const envPath = path.join(__dirname, '.env.local');

// Check if .env.local already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local file already exists.');
  console.log('Please manually add the following variables to your .env.local file:\n');
} else {
  console.log('📝 Creating .env.local file...\n');
}

const envContent = `# Email Configuration - Replace with your actual email settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME=Samara H&H

# Admin email to receive contact form notifications
ADMIN_EMAIL=chetkuba@gmail.com
`;

console.log('📋 Required Environment Variables:');
console.log('==================================');
console.log(envContent);

console.log('🔧 Setup Instructions:');
console.log('======================');
console.log('1. For Gmail:');
console.log('   - Enable 2-Factor Authentication');
console.log('   - Generate an App Password (not your regular password)');
console.log('   - Use the App Password as SMTP_PASS');
console.log('');
console.log('2. Replace the placeholder values:');
console.log('   - SMTP_USER: Your Gmail address');
console.log('   - SMTP_PASS: Your Gmail App Password');
console.log('   - ADMIN_EMAIL: Email where you want to receive notifications');
console.log('');
console.log('3. Restart your development server after making changes');
console.log('');
console.log('📖 For detailed setup instructions, see EMAIL_SETUP.md');

// Create the file if it doesn't exist
if (!fs.existsSync(envPath)) {
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local file created successfully!');
    console.log('📝 Please edit the file with your actual email credentials.');
  } catch (error) {
    console.error('❌ Error creating .env.local file:', error.message);
    console.log('📝 Please create the file manually with the content above.');
  }
}
