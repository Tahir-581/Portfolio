"use client";

import { Header } from "@/components/layout/Header";

import { SmoothScrollProvider } from "./common/SmoothScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Header />
      {children}
    </SmoothScrollProvider>
  );
}
