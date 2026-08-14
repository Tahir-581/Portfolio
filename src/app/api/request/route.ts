import { NextResponse } from "next/server";

import { getProjectById } from "@/data/projects";
import { site } from "@/data/site";
import {
  MailNotConfiguredError,
  sendCustomerConfirmationEmail,
  sendRequestEmail,
} from "@/lib/mail";

type RequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  projectId?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const whatsapp = body.whatsapp?.trim() ?? "";
  const projectId = body.projectId?.trim() ?? "";

  if (!name || !email || !phone || !whatsapp) {
    return NextResponse.json(
      { error: "Name, email, phone, and WhatsApp number are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const project = projectId ? getProjectById(projectId) : undefined;
  const projectLabel = project
    ? `${project.title} (${project.demoUrl})`
    : projectId || "Not specified";

  try {
    await sendRequestEmail({
      to: site.contact.email,
      replyTo: email,
      subject: `Buy Now request — ${project?.title ?? "Custom website"}`,
      text: [
        "New Buy Now / similar custom build request from the Tesoora portfolio.",
        "",
        `Project: ${projectLabel}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `WhatsApp: ${whatsapp}`,
      ].join("\n"),
    });

    await sendCustomerConfirmationEmail({
      to: email,
      name,
      project,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof MailNotConfiguredError) {
      console.error("EMAIL_USERNAME / EMAIL_PASSWORD is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 503 },
      );
    }

    console.error("Request email failed:", err);
    return NextResponse.json(
      { error: "Failed to send your request. Please try again." },
      { status: 502 },
    );
  }
}
