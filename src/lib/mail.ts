import nodemailer from "nodemailer";
import type Transporter from "nodemailer/lib/mailer";

import type { Project } from "@/data/projects";
import { buildCustomerConfirmationEmail } from "@/lib/emails/customerConfirmation";
import { getSiteUrl } from "@/lib/siteUrl";

export class MailNotConfiguredError extends Error {
  constructor(message = "Email service is not configured") {
    super(message);
    this.name = "MailNotConfiguredError";
  }
}

type SendRequestEmailOptions = {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

type SendCustomerConfirmationEmailOptions = {
  to: string;
  name: string;
  project?: Project;
};

function getSmtpConfig() {
  const user = process.env.EMAIL_USERNAME?.trim();
  const pass = process.env.EMAIL_PASSWORD?.trim();

  if (!user || !pass) {
    throw new MailNotConfiguredError();
  }

  const host = process.env.EMAIL_SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.EMAIL_SMTP_PORT ?? "587");
  const from =
    process.env.EMAIL_FROM?.trim() || `Tesoora Leads <${user}>`;

  return { user, pass, host, port, from };
}

function createTransporter() {
  const { user, pass, host, port } = getSmtpConfig();

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });
}

async function sendMail(
  transporter: Transporter,
  options: {
    to: string;
    replyTo?: string;
    subject: string;
    text: string;
    html?: string;
  },
) {
  const { from } = getSmtpConfig();

  await transporter.sendMail({
    from,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

export async function sendRequestEmail({
  to,
  replyTo,
  subject,
  text,
}: SendRequestEmailOptions) {
  const transporter = createTransporter();
  await sendMail(transporter, { to, replyTo, subject, text });
}

export async function sendCustomerConfirmationEmail({
  to,
  name,
  project,
}: SendCustomerConfirmationEmailOptions) {
  const transporter = createTransporter();
  const { subject, html, text } = buildCustomerConfirmationEmail({
    name,
    project,
    siteUrl: getSiteUrl(),
  });

  await sendMail(transporter, { to, subject, text, html });
}
