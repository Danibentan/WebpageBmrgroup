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
    console.log('[BMR] CartButton montado');
  }, []);

  const count = mounted ? getItemCount() : 0;

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Carrito (${count} items)`}
      className="fixed top-28 right-6 z-40 w-12 h-12 rounded-full bg-[#0a1733]/80 backdrop-blur-md border border-[#c9a961]/30 flex items-center justify-center text-[#c9a961] hover:bg-[#c9a961] hover:text-[#0a1733] transition-all duration-300 shadow-lg shadow-black/20"
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
