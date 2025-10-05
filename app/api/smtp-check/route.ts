// app/api/smtp-check/route.ts
import { NextResponse } from "next/server";
import { buildTransporter } from "@/lib/email";

export const runtime = "nodejs";

export async function GET() {
  const tx = buildTransporter();
  if (!tx) return NextResponse.json({ ok: false, reason: "missing_env" }, { status: 500 });

  try {
    await tx.verify(); // ask SMTP server if it's ready
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
