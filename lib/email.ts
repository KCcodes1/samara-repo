// lib/email.ts
import nodemailer from "nodemailer";

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function missingEnv(keys: string[]) {
  return keys.filter((k) => !process.env[k] || process.env[k]!.trim() === "");
}

export function buildTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const missing = missingEnv(["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"]);
  if (missing.length) {
    console.warn(`[mail] Missing env: ${missing.join(", ")}`);
    return null;
  }

  const port = Number(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    requireTLS: process.env.SMTP_REQUIRE_TLS !== "false",
  });

  return cachedTransporter;
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  fromName?: string;
  fromEmail?: string;
}) {
  const tx = buildTransporter();
  if (!tx) throw new Error("Email transporter not configured");

  const fromName = opts.fromName ?? process.env.SMTP_FROM_NAME ?? "";
  const fromEmail =
    opts.fromEmail ?? process.env.SMTP_FROM_EMAIL ?? process.env.SMTP_USER!;
  const from = fromName ? `"${fromName}" <${fromEmail}>` : fromEmail;

  const info = await tx.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });

  return info.messageId;
}
