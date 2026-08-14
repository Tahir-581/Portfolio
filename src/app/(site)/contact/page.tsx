import type { Metadata } from "next";

import { Magnetic } from "@/components/common/Magnetic";
import { RoundedButton } from "@/components/common/RoundedButton";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { site, whatsappHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Tesoora",
  description: "Start a conversation about your next website with Tesoora.",
};

export default function ContactPage() {
  return (
    <>
      <PageShell title="Contact" kicker="Collaborate">
        <p>
          Tell us about your business, timeline, and what a successful website
          looks like for you. We typically reply within two business days.
        </p>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-12">
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${site.contact.email}`}
              className="block text-xl text-fg transition-opacity hover:opacity-70"
            >
              {site.contact.email}
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="block text-xl text-fg transition-opacity hover:opacity-70"
            >
              {site.contact.phone}
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xl text-fg transition-opacity hover:opacity-70"
            >
              {site.contact.whatsappDisplay}
            </a>
          </Magnetic>
        </div>
        <div className="mt-12">
          <RoundedButton href={`mailto:${site.contact.email}`}>
            Send an email
          </RoundedButton>
        </div>
      </PageShell>
      <Footer />
    </>
  );
}
