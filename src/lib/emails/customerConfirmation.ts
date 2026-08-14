import type { Project } from "@/data/projects";
import { site } from "@/data/site";

type BuildCustomerConfirmationEmailOptions = {
  name: string;
  project?: Project;
  siteUrl: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "there";
  return trimmed.split(/\s+/)[0] ?? trimmed;
}

function resolveUrl(pathOrUrl: string, siteUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteUrl}${path}`;
}

export function buildCustomerConfirmationEmail({
  name,
  project,
  siteUrl,
}: BuildCustomerConfirmationEmailOptions) {
  const greeting = escapeHtml(firstName(name));
  const projectTitle = project ? escapeHtml(project.title) : "Custom website";
  const projectCategory = project ? escapeHtml(project.category) : "Custom build";
  const projectOutcome = project
    ? escapeHtml(project.outcome)
    : escapeHtml(
        "A tailored website built around your brand, goals, and customers — designed to look sharp and convert.",
      );
  const resolvedDemoUrl = project
    ? resolveUrl(project.demoUrl, siteUrl)
    : siteUrl;
  const demoUrl = escapeHtml(resolvedDemoUrl);
  const imageUrl = project ? `${siteUrl}${project.image}` : "";
  const subject = project
    ? `We received your request — ${project.title}`
    : "We received your request — Tesoora";

  const text = [
    `Hi ${firstName(name)},`,
    "",
    project
      ? `Thanks for reaching out through Tesoora about a custom build similar to ${project.title}.`
      : "Thanks for reaching out through Tesoora about a custom website build.",
    "",
    "What happens next:",
    "1. Your request has been received.",
    "2. Our team will review your project details.",
    "3. We will follow up within 24–48 hours.",
    "",
    project ? `View the live demo: ${resolvedDemoUrl}` : `Visit us: ${siteUrl}`,
    "",
    `Questions? Reply to this email or contact us at ${site.contact.email}.`,
    "",
    "— Tesoora",
  ].join("\n");

  const heroBlock = project
    ? `<tr>
        <td style="padding:0;">
          <img
            src="${imageUrl}"
            alt="${projectTitle}"
            width="600"
            style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:12px 12px 0 0;"
          />
        </td>
      </tr>`
    : `<tr>
        <td style="padding:48px 32px;background:linear-gradient(135deg,#1a1a1a 0%,#0d0d0d 100%);border-radius:12px 12px 0 0;text-align:center;">
          <p style="margin:0;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:#9a9590;">Custom website build</p>
          <p style="margin:12px 0 0;font-size:28px;line-height:1.2;font-weight:600;color:#f0ede8;">Your project starts here</p>
        </td>
      </tr>`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#111111;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#111111;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;">
            <tr>
              <td style="padding:24px 28px;background-color:#0d0d0d;border:1px solid #2a2a2a;border-radius:16px 16px 0 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <p style="margin:0;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#f0ede8;">Tesoora</p>
                      <p style="margin:6px 0 0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#9a9590;">Website Development Agency</p>
                    </td>
                    <td align="right" style="vertical-align:top;">
                      <span style="display:inline-block;padding:8px 12px;border:1px solid #2a2a2a;border-radius:999px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#f0ede8;">Request received</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:#161616;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  ${heroBlock}
                  <tr>
                    <td style="padding:32px;">
                      <p style="margin:0 0 10px;font-size:14px;color:#9a9590;">Hi ${greeting},</p>
                      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;font-weight:600;color:#f0ede8;">
                        Thanks for choosing a build like ${projectTitle}
                      </h1>
                      <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#cfcac4;">
                        We have received your Buy Now request and our team is already reviewing it. Below is the demo you selected — the kind of experience we can tailor for your brand.
                      </p>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;background-color:#0d0d0d;border:1px solid #2a2a2a;border-radius:12px;">
                        <tr>
                          <td style="padding:20px 22px;">
                            <span style="display:inline-block;margin-bottom:12px;padding:6px 10px;border-radius:999px;background-color:#222222;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#f0ede8;">${projectCategory}</span>
                            <p style="margin:0 0 8px;font-size:20px;line-height:1.3;font-weight:600;color:#f0ede8;">${projectTitle}</p>
                            <p style="margin:0;font-size:15px;line-height:1.7;color:#9a9590;">${projectOutcome}</p>
                          </td>
                        </tr>
                      </table>
                      <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
                        <tr>
                          <td align="center" style="border-radius:999px;background-color:#f0ede8;">
                            <a href="${demoUrl}" style="display:inline-block;padding:14px 28px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;color:#0d0d0d;">View live demo</a>
                          </td>
                        </tr>
                      </table>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #2a2a2a;">
                        <tr>
                          <td style="padding-top:24px;">
                            <p style="margin:0 0 14px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#9a9590;">What happens next</p>
                            <p style="margin:0 0 10px;font-size:15px;line-height:1.6;color:#f0ede8;">1. Your request is confirmed and logged with our team.</p>
                            <p style="margin:0 0 10px;font-size:15px;line-height:1.6;color:#f0ede8;">2. We review your details and the demo you selected.</p>
                            <p style="margin:0;font-size:15px;line-height:1.6;color:#f0ede8;">3. We follow up within <strong style="color:#f0ede8;">24–48 hours</strong> to discuss your custom build.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;background-color:#0d0d0d;border:1px solid #2a2a2a;border-top:0;border-radius:0 0 16px 16px;text-align:center;">
                <p style="margin:0 0 8px;font-size:14px;color:#9a9590;">Questions? Reply to this email or write to</p>
                <p style="margin:0 0 16px;font-size:14px;">
                  <a href="mailto:${escapeHtml(site.contact.email)}" style="color:#f0ede8;text-decoration:none;">${escapeHtml(site.contact.email)}</a>
                </p>
                <p style="margin:0;font-size:12px;color:#666666;">© ${new Date().getFullYear()} Tesoora. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}
