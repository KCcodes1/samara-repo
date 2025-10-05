#!/usr/bin/env node

const fetch = require('node-fetch');

async function testContactForm() {
  console.log('🧪 Testing Contact Form API');
  console.log('==========================\n');

  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message to check if the contact form is working.'
  };

  try {
    console.log('📤 Sending test request...');
    console.log('📋 Test data:', testData);

    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

    const result = await response.json();
    console.log('📋 Response body:', result);

    if (response.ok) {
      console.log('✅ Test passed! Contact form is working.');
    } else {
      console.log('❌ Test failed!');
      console.log('❌ Error:', result.error);
      if (result.details) {
        console.log('❌ Details:', result.details);
      }
    }
  } catch (error) {
    console.error('❌ Test error:', error.message);
    console.error('❌ Make sure the development server is running on localhost:3000');
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000');
    console.log('✅ Server is running on localhost:3000');
    return true;
  } catch (error) {
    console.log('❌ Server is not running on localhost:3000');
    console.log('❌ Please start the development server with: npm run dev');
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await testContactForm();
  }
}

main().catch(console.error);
