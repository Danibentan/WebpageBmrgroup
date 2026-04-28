'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart-store';

export function CartButton() {
  const { toggleCart, getItemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const count = mounted ? getItemCount() : 0;

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Carrito (${count} items)`}
      className="fixed right-6 top-24 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a961]/30 bg-[#0a1733]/80 text-[#c9a961] backdrop-blur-md transition-all duration-300 hover:bg-[#c9a961] hover:text-[#0a1733]"
    >
      <ShoppingBag size={18} />
      <AnimatePresence>
        {mounted && count > 0 ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c9a961] text-[10px] font-medium text-[#0a1733]"
          >
            {count}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  );
}
