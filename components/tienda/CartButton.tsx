'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CartButton() {
  const { toggleCart, getItemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? getItemCount() : 0;

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Carrito (${count} items)`}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a961]/40 bg-[var(--bg-elevated-1)] text-[#c9a961] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-[#c9a961] hover:text-[#0a1733]"
    >
      <ShoppingBag size={18} />
      <AnimatePresence>
        {mounted && count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c9a961] text-[#0a1733] text-[10px] font-medium flex items-center justify-center"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
