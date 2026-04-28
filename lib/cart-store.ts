'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartItem } from '@/types/product';

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  updateMetros: (id: string, metros: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  hasConsultaItems: () => boolean;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.id === item.id);

          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
              )
            };
          }

          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((entry) => entry.id !== id) })),
      updateQuantity: (id, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((entry) => entry.id !== id)
              : state.items.map((entry) => (entry.id === id ? { ...entry, quantity: qty } : entry))
        })),
      updateMetros: (id, metros) =>
        set((state) => ({
          items: state.items.map((entry) => (entry.id === id ? { ...entry, metros } : entry))
        })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      getTotal: () =>
        get().items.reduce((sum, item) => {
          if (item.priceUnit === 'consultar') return sum;
          const base = item.priceUnit === 'm2' ? item.price * (item.metros || 1) : item.price;
          return sum + base * item.quantity;
        }, 0),
      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      hasConsultaItems: () => get().items.some((item) => item.priceUnit === 'consultar')
    }),
    { name: 'bmr-cart', skipHydration: true }
  )
);
