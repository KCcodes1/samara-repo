#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ContentBackup {
  constructor() {
    this.contentDir = path.join(process.cwd(), 'content');
    this.backupDir = path.join(process.cwd(), 'backups');
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  }

  createBackup() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }

    const backupPath = path.join(this.backupDir, `content-${this.timestamp}`);
    
    try {
      execSync(`cp -r "${this.contentDir}" "${backupPath}"`);
      console.log(`✅ Content backed up to: ${backupPath}`);
      
      // Keep only last 10 backups
      this.cleanOldBackups();
    } catch (error) {
      console.error('❌ Backup failed:', error.message);
    }
  }

  cleanOldBackups() {
    const backups = fs.readdirSync(this.backupDir)
      .filter(dir => dir.startsWith('content-'))
      .sort()
      .reverse();

    if (backups.length > 10) {
      const toDelete = backups.slice(10);
      toDelete.forEach(backup => {
        const backupPath = path.join(this.backupDir, backup);
        fs.rmSync(backupPath, { recursive: true, force: true });
        console.log(`🗑️  Removed old backup: ${backup}`);
      });
    }
  }

  restoreBackup(backupName) {
    const backupPath = path.join(this.backupDir, backupName);
    
    if (!fs.existsSync(backupPath)) {
      console.error(`❌ Backup not found: ${backupName}`);
      return;
    }

    try {
      // Create current backup before restore
      this.createBackup();
      
      // Restore from backup
      execSync(`rm -rf "${this.contentDir}"`);
      execSync(`cp -r "${backupPath}" "${this.contentDir}"`);
      
      console.log(`✅ Content restored from: ${backupName}`);
    } catch (error) {
      console.error('❌ Restore failed:', error.message);
    }
  }

  listBackups() {
    const backups = fs.readdirSync(this.backupDir)
      .filter(dir => dir.startsWith('content-'))
      .sort()
      .reverse();

    console.log('📦 Available backups:');
    backups.forEach((backup, index) => {
      const backupPath = path.join(this.backupDir, backup);
      const stats = fs.statSync(backupPath);
      console.log(`  ${index + 1}. ${backup} (${stats.mtime.toLocaleString()})`);
    });
  }
}

// CLI interface
const backup = new ContentBackup();
const command = process.argv[2];

switch (command) {
  case 'create':
    backup.createBackup();
    break;
  case 'restore':
    const backupName = process.argv[3];
    if (!backupName) {
      console.log('❌ Please specify backup name');
      backup.listBackups();
    } else {
      backup.restoreBackup(backupName);
    }
    break;
  case 'list':
    backup.listBackups();
    break;
  default:
    console.log(`
Content Backup Usage:
  node scripts/backup-content.js create     - Create new backup
  node scripts/backup-content.js list      - List available backups
  node scripts/backup-content.js restore <name> - Restore from backup
    `);
}
