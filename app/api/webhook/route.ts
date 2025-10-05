import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    // Verify the webhook is from GitHub (optional but recommended)
    const signature = req.headers.get('x-hub-signature-256');
    const body = await req.text();
    
    // For now, we'll skip signature verification for simplicity
    // In production, you should verify the GitHub webhook signature
    
    console.log('Webhook received - syncing content...');
    
    // Pull latest changes from GitHub
    const { stdout, stderr } = await execAsync('git pull origin main');
    
    if (stderr) {
      console.error('Git pull error:', stderr);
      return NextResponse.json({ error: 'Failed to sync' }, { status: 500 });
    }
    
    console.log('Content synced successfully:', stdout);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content synced successfully',
      output: stdout 
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}
