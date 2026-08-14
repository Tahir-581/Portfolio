import type { Metadata } from "next";
import { Bodoni_Moda, Source_Sans_3 } from "next/font/google";

import { OrionShell } from "@/demos/orion/components/OrionShell";
import { OrionStore } from "@/demos/orion/store";
import "@/demos/orion/styles.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-orion-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-orion-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orion Horlogerie",
  description:
    "A Geneva maison composing haute horlogerie since 1812 — Meridian, Épure, Sidereal, and Vespera.",
  robots: { index: false, follow: false },
};

export default function OrionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${bodoni.variable} ${sourceSans.variable}`}>
      <OrionStore>
        <OrionShell>{children}</OrionShell>
      </OrionStore>
    </div>
  );
}
