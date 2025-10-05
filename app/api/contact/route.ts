// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";         // IMPORTANT: Nodemailer needs Node runtime
export const dynamic = "force-dynamic";  // Don't cache

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const { name, email, message } = body;

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Admin notification
    const adminId = await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: "New contact form submission",
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${(message || "")
        .toString()
        .replace(/\n/g, "<br/>")}</p>`,
    });

    // Customer confirmation
    const userId = await sendEmail({
      to: email,
      subject: "Thank you for contacting Samara H&H",
      text: "We received your message and will get back to you shortly.",
      html: "<p>We received your message and will get back to you shortly.</p>",
    });

    return NextResponse.json({ ok: true, adminId, userId });
  } catch (e: any) {
    console.error("[mail] send failed:", e?.message || e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
