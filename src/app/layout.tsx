import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { Providers } from "@/components/Providers";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tesoora — Website Development Agency",
  description:
    "Tesoora designs and builds custom websites for brands — stores, cafes, bakeries, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
