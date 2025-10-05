import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || (!email && !message)) {
      return NextResponse.json(
        { ok: false, error: 'Name and either email or message are required' },
        { status: 400 }
      );
    }

    // Log the contact form submission (placeholder for email/CRM integration)
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email service (SendGrid, Nodemailer, etc.)
    // TODO: Save to CRM/database
    // TODO: Send confirmation email to user

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
