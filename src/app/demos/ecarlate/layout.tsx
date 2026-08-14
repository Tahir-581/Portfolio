import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";

import { EcarlateShell } from "@/demos/ecarlate/components/EcarlateShell";
import { EcarlateStore } from "@/demos/ecarlate/store";
import "@/demos/ecarlate/styles.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Écarlate Paris",
  description:
    "A Paris maison composing unexpected fragrances — scarlet, ice, and the memory of a room after midnight.",
  robots: { index: false, follow: false },
};

export default function EcarlateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} ${outfit.variable}`}>
      <EcarlateStore>
        <EcarlateShell>{children}</EcarlateShell>
      </EcarlateStore>
    </div>
  );
}
