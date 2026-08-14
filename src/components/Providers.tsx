"use client";

import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

import { SmoothScrollProvider } from "./common/SmoothScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Header />
      {children}
      <WhatsAppButton />
    </SmoothScrollProvider>
  );
}
