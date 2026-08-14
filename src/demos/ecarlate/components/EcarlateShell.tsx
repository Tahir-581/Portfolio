"use client";

import { useEffect } from "react";

import { useEcarlate } from "../store";
import { AccountPanel } from "./AccountPanel";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MenuOverlay } from "./MenuOverlay";
import { PromoBar } from "./PromoBar";
import { QuickShop } from "./QuickShop";
import { SearchOverlay } from "./SearchOverlay";

export function EcarlateShell({ children }: { children: React.ReactNode }) {
  const { overlay } = useEcarlate();
  const locked = overlay !== null;

  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);

  return (
    <div className="ecarlate-root">
      <PromoBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <MenuOverlay />
      <CartDrawer />
      <QuickShop />
      <SearchOverlay />
      <AccountPanel />
    </div>
  );
}
