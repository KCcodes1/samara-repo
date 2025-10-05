#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envContent = `# Used elsewhere in your app
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Gmail SMTP (App Password required)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false           # true only if using port 465
SMTP_REQUIRE_TLS=true
SMTP_USER=samarahnh@gmail.com
SMTP_PASS=<YOUR_16_CHAR_GMAIL_APP_PASSWORD_NO_SPACES>
SMTP_FROM_NAME=Samara H&H
SMTP_FROM_EMAIL=samarahnh@gmail.com

# Admin destination
ADMIN_EMAIL=chetkuba@gmail.com
`;

const envPath = path.join(__dirname, '.env.local');

console.log('🔧 Setting up environment variables...');
console.log('');
console.log('📝 Creating .env.local file with Gmail SMTP configuration');
console.log('⚠️  IMPORTANT: Replace <YOUR_16_CHAR_GMAIL_APP_PASSWORD_NO_SPACES> with your actual Gmail App Password');
console.log('');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Open .env.local file');
  console.log('2. Replace <YOUR_16_CHAR_GMAIL_APP_PASSWORD_NO_SPACES> with your Gmail App Password');
  console.log('3. Restart your development server (npm run dev)');
  console.log('4. Test the health check: http://localhost:3000/api/smtp-check');
  console.log('5. Test the contact form submission');
  console.log('');
  console.log('🔐 Gmail App Password setup:');
  console.log('1. Go to Google Account settings');
  console.log('2. Security → 2-Step Verification → App passwords');
  console.log('3. Generate a new app password for "Mail"');
  console.log('4. Use the 16-character password (no spaces)');
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
  console.log('');
  console.log('📝 Please create the file manually with the following content:');
  console.log('');
  console.log(envContent);
}
