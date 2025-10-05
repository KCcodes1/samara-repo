#!/usr/bin/env node

/**
 * CMS Sync Script
 * Run this script to sync CMS changes from GitHub to your local website
 * Usage: node scripts/sync-cms.js
 */

const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function syncCMS() {
  console.log('🔄 Syncing CMS changes from GitHub...');
  
  try {
    // Pull latest changes from GitHub
    const { stdout, stderr } = await execAsync('git pull origin main');
    
    if (stderr && !stderr.includes('warning')) {
      console.error('❌ Git pull error:', stderr);
      return;
    }
    
    console.log('✅ Content synced successfully!');
    console.log('📝 Changes:', stdout);
    
    console.log('\n🎉 Your website should now show the latest CMS changes!');
    console.log('🌐 Visit: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    console.log('\n💡 Try running: git status');
  }
}

// Run the sync
syncCMS();
