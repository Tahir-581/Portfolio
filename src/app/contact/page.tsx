import type { Metadata } from "next";

import { Magnetic } from "@/components/common/Magnetic";
import { RoundedButton } from "@/components/common/RoundedButton";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Tahir Ahmad",
  description: "Start a conversation about your next project.",
};

export default function ContactPage() {
  return (
    <>
      <PageShell title="Contact" kicker="Collaborate">
        <p>
          Share a short note about your timeline, scope, and what a successful
          outcome looks like. I typically reply within two business days.
        </p>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-12">
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
