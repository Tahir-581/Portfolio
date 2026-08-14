"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getProduct, type Product, type ProductSize } from "./data";

export type CartLine = {
  key: string;
  slug: string;
  size: ProductSize;
  qty: number;
};

type Overlay = "menu" | "cart" | "search" | "account" | "quickshop" | null;

type StoreValue = {
  lines: CartLine[];
  overlay: Overlay;
  quickShop: Product | null;
  count: number;
  subtotal: number;
  open: (next: Overlay) => void;
  close: () => void;
  setQuickShop: (product: Product | null) => void;
  add: (slug: string, size: ProductSize, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function lineKey(slug: string, size: ProductSize) {
  return `${slug}:${size}`;
}

export function EcarlateStore({ children }: { children: ReactNode }) {
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

  const add = useCallback((slug: string, size: ProductSize, qty = 1) => {
    const key = lineKey(slug, size);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { key, slug, size, qty }];
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
      s +=
        (line.size === "50ml" ? product.price50 : product.price) * line.qty;
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

export function useEcarlate() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useEcarlate must be used within EcarlateStore");
  }
  return ctx;
}
