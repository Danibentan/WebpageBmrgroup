'use client';

import { useSyncExternalStore } from 'react';
import type { CartItem } from '@/types/product';

type CartSnapshot = {
  items: CartItem[];
  isOpen: boolean;
};

const STORAGE_KEY = 'bmr-cart';

let state: CartSnapshot = {
  items: [],
  isOpen: false
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function persistItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
}

function setState(updater: CartSnapshot | ((previous: CartSnapshot) => CartSnapshot)) {
  const nextState = typeof updater === 'function' ? updater(state) : updater;
  state = nextState;
  persistItems(state.items);
  emitChange();
}

export function rehydrateCart() {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { items?: CartItem[] };
    if (!Array.isArray(parsed.items)) return;
    state = { ...state, items: parsed.items };
    emitChange();
  } catch {
    // ignore invalid localStorage payloads
  }
}

const actions = {
  addItem: (item: Omit<CartItem, 'quantity'>) =>
    setState((previous) => {
      const existing = previous.items.find((entry) => entry.id === item.id);
      if (existing) {
        return {
          ...previous,
          items: previous.items.map((entry) =>
            entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
          )
        };
      }
      return { ...previous, items: [...previous.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (id: string) =>
    setState((previous) => ({ ...previous, items: previous.items.filter((entry) => entry.id !== id) })),
  updateQuantity: (id: string, qty: number) =>
    setState((previous) => ({
      ...previous,
      items:
        qty <= 0
          ? previous.items.filter((entry) => entry.id !== id)
          : previous.items.map((entry) => (entry.id === id ? { ...entry, quantity: qty } : entry))
    })),
  updateMetros: (id: string, metros: number) =>
    setState((previous) => ({
      ...previous,
      items: previous.items.map((entry) => (entry.id === id ? { ...entry, metros } : entry))
    })),
  clearCart: () => setState((previous) => ({ ...previous, items: [] })),
  openCart: () => setState((previous) => ({ ...previous, isOpen: true })),
  closeCart: () => setState((previous) => ({ ...previous, isOpen: false })),
  toggleCart: () => setState((previous) => ({ ...previous, isOpen: !previous.isOpen }))
};

type UseCart = (() => CartSnapshot & typeof actions & {
  getTotal: () => number;
  getItemCount: () => number;
  hasConsultaItems: () => boolean;
}) & {
  persist: { rehydrate: () => void };
};

export const useCart = (() => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    ...snapshot,
    ...actions,
    getTotal: () =>
      snapshot.items.reduce((sum, item) => {
        if (item.priceUnit === 'consultar') return sum;
        const base = item.priceUnit === 'm2' ? item.price * (item.metros || 1) : item.price;
        return sum + base * item.quantity;
      }, 0),
    getItemCount: () => snapshot.items.reduce((sum, item) => sum + item.quantity, 0),
    hasConsultaItems: () => snapshot.items.some((item) => item.priceUnit === 'consultar')
  };
}) as UseCart;

useCart.persist = {
  rehydrate: rehydrateCart
};
