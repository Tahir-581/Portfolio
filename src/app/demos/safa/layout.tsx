import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";

import { SafaShell } from "@/demos/safa/components/SafaShell";
import { SafaStore } from "@/demos/safa/store";
import "@/demos/safa/styles.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-safa-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-safa-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dār Al-Safā",
  description:
    "A modest-luxury fashion house — lawn, ready-to-wear, and fragrance composed for serenity.",
  robots: { index: false, follow: false },
};

export default function SafaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`}>
      <SafaStore>
        <SafaShell>{children}</SafaShell>
      </SafaStore>
    </div>
  );
}
