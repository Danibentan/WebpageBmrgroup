'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { CheckoutModal } from './CheckoutModal';
import type { CartItem } from '@/types/product';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, updateMetros, clearCart, hasConsultaItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        if (item.priceUnit === 'consultar') return sum;
        const unit = item.priceUnit === 'm2' ? item.price * (item.metros || 1) : item.price;
        return sum + unit * item.quantity;
      }, 0),
    [items]
  );

  const checkoutItems = useMemo(
    () =>
      items
        .filter((item) => item.priceUnit !== 'consultar' && item.price > 0)
        .map((item) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.priceUnit === 'm2' ? item.price * (item.metros || 1) : item.price,
          currency_id: 'ARS'
        })),
    [items]
  );

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-md flex-col border-l border-[#c9a961]/20 bg-[var(--bg-elevated-2)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a961]">Tu pedido</p>
                <h2 className="mt-1 font-editorial text-2xl text-white">Carrito</h2>
              </div>
              <button type="button" onClick={closeCart} aria-label="Cerrar carrito" className="text-white/60 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="py-12 text-center font-editorial text-sm italic text-white/50">Tu carrito está vacío.</p>
              ) : (
                items.map((item: CartItem) => (
                  <div key={item.id} className="flex gap-4 border-b border-white/5 pb-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-[var(--bg-elevated-1)] to-[var(--bg-elevated-2)]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-editorial text-sm text-white">{item.name}</h3>
                      <p className="mt-0.5 text-[10px] text-white/50">{item.description}</p>
                      {item.priceUnit === 'm2' ? (
                        <div className="mt-2 flex items-center gap-2">
                          <label className="text-[10px] text-white/60">m²:</label>
                          <input
                            type="number"
                            min={1}
                            value={item.metros || 1}
                            onChange={(e) => updateMetros(item.id, Number(e.target.value))}
                            className="w-14 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white"
                          />
                        </div>
                      ) : null}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[#c9a961] hover:text-[#c9a961]"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs text-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[#c9a961] hover:text-[#c9a961]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button type="button" onClick={() => removeItem(item.id)} aria-label="Eliminar" className="text-white/40 hover:text-red-400">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs italic text-[#c9a961] font-editorial">{item.priceUnit === 'consultar' ? 'A confirmar' : formatPrice(item.price)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 ? (
              <div className="space-y-4 border-t border-white/10 p-6">
                {hasConsultaItems() ? <div className="text-[10px] italic leading-relaxed text-[#c9a961]/80">* Ítems "A confirmar" no se incluyen en checkout online.</div> : null}
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/60">Total estimado</span>
                  <span className="font-editorial text-2xl text-[#c9a961]">{formatPrice(total)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={total <= 0 || checkoutItems.length === 0}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a961] py-3 text-sm font-medium tracking-wide text-[#0a1733] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Comprar
                </button>
                <button type="button" onClick={clearCart} className="w-full text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/70">
                  Vaciar carrito
                </button>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
      </AnimatePresence>
      <CheckoutModal open={isCheckoutOpen} items={checkoutItems} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
