// src/lib/mail.ts
import "server-only";
import nodemailer, { Transporter } from "nodemailer";

export type SendMailArgs = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
};

function readConfig(): SmtpConfig {
  const user = process.env.SMTP_USER ?? process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS ?? process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "SMTP not configured. Set SMTP_USER & SMTP_PASS or GMAIL_USER & GMAIL_APP_PASSWORD in .env.local"
    );
  }

  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = (process.env.SMTP_SECURE ?? "true") === "true";

  return {
    host,
    port,
    secure,
    user,
    pass,
    fromName: process.env.FROM_NAME ?? "Twinly",
  };
}

let cached: { key?: string; transporter?: Transporter } = {};

function keyOf(c: SmtpConfig) {
  return `${c.host}|${c.port}|${c.secure}|${c.user}`;
}

export function getTransporter(): Transporter {
  const cfg = readConfig();
  const key = keyOf(cfg);

  if (cached.transporter && cached.key === key) {
    return cached.transporter;
  }

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure, // true for 465, false for 587
    auth: { user: cfg.user, pass: cfg.pass },
  });

  cached = { key, transporter };
  return transporter;
}

export async function verifySmtp(): Promise<void> {
  const t = getTransporter();
  await t.verify(); // throws on bad creds (e.g., Gmail 535)
}

export async function sendMail(args: SendMailArgs) {
  const cfg = readConfig();
  const t = getTransporter();

  return t.sendMail({
    from: `"${cfg.fromName}" <${cfg.user}>`,
    to: args.to,
    subject: args.subject,
    text: args.text,
    html: args.html,
    replyTo: args.replyTo,
  });
}

/**
 * Convenience checker for routes that want to skip mail if not configured.
 * Returns a string error message if misconfigured, otherwise undefined.
 */
export function smtpMisconfigured(): string | undefined {
  const user = process.env.SMTP_USER ?? process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS ?? process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return "Missing SMTP_USER/GMAIL_USER or SMTP_PASS/GMAIL_APP_PASSWORD";
}
