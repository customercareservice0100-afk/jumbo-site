import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = { id: string; qty: number };

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  toggleWish: (id: string) => void;
  clear: () => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      add: (id, qty = 1) =>
        set((state) => {
          const existing = state.cart.find((line) => line.id === id);
          if (!existing) return { cart: [...state.cart, { id, qty }] };
          return {
            cart: state.cart.map((line) =>
              line.id === id ? { ...line, qty: line.qty + qty } : line,
            ),
          };
        }),
      setQty: (id, qty) =>
        set((state) => ({
          cart:
            qty < 1
              ? state.cart.filter((line) => line.id !== id)
              : state.cart.map((line) => (line.id === id ? { ...line, qty } : line)),
        })),
      remove: (id) => set((state) => ({ cart: state.cart.filter((line) => line.id !== id) })),
      toggleWish: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((item) => item !== id)
            : [...state.wishlist, id],
        })),
      clear: () => set({ cart: [] }),
    }),
    { name: "jumbo-steel-shop" },
  ),
);

export const PHONE_TEL = "+254756005660";
export const PHONE_DISPLAY = "+254 756 005 660";
export const WHATSAPP = "254108072939";
export const WHATSAPP_DISPLAY = "+254 108 072 939";
export const EMAIL = "jumbo@jubileegroup.org";
export const MAP_URL = "https://maps.app.goo.gl/6aUh2HEXBY4WuUwa7";
export const MAP_EMBED =
  "https://maps.google.com/maps?q=Jumbo%20Steel%20Mills%20Limited%20C111&z=14&output=embed";

export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export type ShopSearch = {
  q: string;
  cat: string;
  sort: string;
};

export const defaultShopSearch: ShopSearch = { q: "", cat: "all", sort: "featured" };
