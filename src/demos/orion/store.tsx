"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getProduct, type Product, type StrapId } from "./data";

export type CartLine = {
  key: string;
  slug: string;
  strap: StrapId;
  qty: number;
};

export type Overlay =
  | "menu"
  | "cart"
  | "search"
  | "account"
  | "quickshop"
  | "salon"
  | "care"
  | null;

type StoreValue = {
  lines: CartLine[];
  overlay: Overlay;
  quickShop: Product | null;
  count: number;
  subtotal: number;
  open: (next: Overlay) => void;
  close: () => void;
  setQuickShop: (product: Product | null) => void;
  add: (slug: string, strap: StrapId, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function lineKey(slug: string, strap: StrapId) {
  return `${slug}:${strap}`;
}

export function OrionStore({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [quickShop, setQuickShopState] = useState<Product | null>(null);

  const open = useCallback((next: Overlay) => setOverlay(next), []);
  const close = useCallback(() => {
    setOverlay(null);
    setQuickShopState(null);
  }, []);

  const setQuickShop = useCallback((product: Product | null) => {
    setQuickShopState(product);
    setOverlay(product ? "quickshop" : null);
  }, []);

  const add = useCallback((slug: string, strap: StrapId, qty = 1) => {
    const key = lineKey(slug, strap);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { key, slug, strap, qty }];
    });
    setOverlay("cart");
    setQuickShopState(null);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => {
      if (qty < 1) return prev.filter((l) => l.key !== key);
      return prev.map((l) => (l.key === key ? { ...l, qty } : l));
    });
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const line of lines) {
      const product = getProduct(line.slug);
      if (!product) continue;
      c += line.qty;
      s += product.price * line.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      overlay,
      quickShop,
      count,
      subtotal,
      open,
      close,
      setQuickShop,
      add,
      setQty,
      remove,
    }),
    [
      lines,
      overlay,
      quickShop,
      count,
      subtotal,
      open,
      close,
      setQuickShop,
      add,
      setQty,
      remove,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useOrion() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useOrion must be used within OrionStore");
  }
  return ctx;
}
