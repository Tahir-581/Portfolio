"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getProduct,
  type DepartmentId,
  type Product,
  type ProductSize,
} from "./data";

export type CartLine = {
  key: string;
  slug: string;
  size: ProductSize;
  qty: number;
};

export type Overlay =
  | "menu"
  | "cart"
  | "search"
  | "account"
  | "wishlist"
  | "quickshop"
  | "tracking"
  | "gifting"
  | null;

type StoreValue = {
  lines: CartLine[];
  wishlist: string[];
  overlay: Overlay;
  mega: DepartmentId | null;
  quickShop: Product | null;
  count: number;
  subtotal: number;
  wishCount: number;
  open: (next: Overlay) => void;
  close: () => void;
  setMega: (next: DepartmentId | null) => void;
  setQuickShop: (product: Product | null) => void;
  add: (slug: string, size: ProductSize, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  toggleWish: (slug: string) => void;
  wished: (slug: string) => boolean;
};

const StoreContext = createContext<StoreValue | null>(null);

function lineKey(slug: string, size: ProductSize) {
  return `${slug}:${size}`;
}

export function SafaStore({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [mega, setMegaState] = useState<DepartmentId | null>(null);
  const [quickShop, setQuickShopState] = useState<Product | null>(null);

  const open = useCallback((next: Overlay) => {
    setMegaState(null);
    setOverlay(next);
  }, []);

  const close = useCallback(() => {
    setOverlay(null);
    setQuickShopState(null);
    setMegaState(null);
  }, []);

  const setMega = useCallback((next: DepartmentId | null) => {
    setOverlay(null);
    setMegaState(next);
  }, []);

  const setQuickShop = useCallback((product: Product | null) => {
    setQuickShopState(product);
    setMegaState(null);
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
    setMegaState(null);
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

  const toggleWish = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const wished = useCallback(
    (slug: string) => wishlist.includes(slug),
    [wishlist],
  );

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
      wishlist,
      overlay,
      mega,
      quickShop,
      count,
      subtotal,
      wishCount: wishlist.length,
      open,
      close,
      setMega,
      setQuickShop,
      add,
      setQty,
      remove,
      toggleWish,
      wished,
    }),
    [
      lines,
      wishlist,
      overlay,
      mega,
      quickShop,
      count,
      subtotal,
      open,
      close,
      setMega,
      setQuickShop,
      add,
      setQty,
      remove,
      toggleWish,
      wished,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useSafa() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useSafa must be used within SafaStore");
  }
  return ctx;
}
