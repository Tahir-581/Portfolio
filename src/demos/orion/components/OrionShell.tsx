"use client";

import { useEffect } from "react";

import { useOrion } from "../store";
import { AccountPanel } from "./AccountPanel";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MenuOverlay } from "./MenuOverlay";
import { PromoBar } from "./PromoBar";
import { QuickShop } from "./QuickShop";
import { SearchOverlay } from "./SearchOverlay";
import { StubPanel } from "./StubPanel";

export function OrionShell({ children }: { children: React.ReactNode }) {
  const { overlay } = useOrion();
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
    <div className="orion-root">
      <PromoBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <MenuOverlay />
      <CartDrawer />
      <QuickShop />
      <SearchOverlay />
      <AccountPanel />
      <StubPanel
        kind="salon"
        title="Find a salon"
        body="Private viewings are arranged in commissioned builds. This preview lists the Geneva salon as a design study — appointments are not booked here."
      />
      <StubPanel
        kind="care"
        title="Care & service"
        body="Movement service, polishing, and strap exchange are available on a commissioned maison site. This demo does not process aftercare requests."
      />
    </div>
  );
}
