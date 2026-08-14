"use client";

import { useEffect } from "react";

import { useSafa } from "../store";
import { AccountPanel } from "./AccountPanel";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MenuOverlay } from "./MenuOverlay";
import { PromoBar } from "./PromoBar";
import { QuickShop } from "./QuickShop";
import { SearchOverlay } from "./SearchOverlay";
import { StubPanel } from "./StubPanel";
import { WishlistPanel } from "./WishlistPanel";

export function SafaShell({ children }: { children: React.ReactNode }) {
  const { overlay } = useSafa();
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
    <div className="safa-root">
      <PromoBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <MenuOverlay />
      <CartDrawer />
      <QuickShop />
      <SearchOverlay />
      <AccountPanel />
      <WishlistPanel />
      <StubPanel
        kind="tracking"
        title="Tracking"
        body="Order tracking is disabled in this live demo. The bag, wishlist, and catalog are fully interactive."
      />
      <StubPanel
        kind="gifting"
        title="Gifting"
        body="Gift wrap and cards are available on a commissioned build. This preview does not process gifts."
      />
    </div>
  );
}
