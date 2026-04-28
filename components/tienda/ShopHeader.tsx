'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function ShopHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#c9a961]">Tienda · 24 productos</p>
      <h1 className="font-editorial text-4xl leading-none tracking-tight text-white md:text-5xl">
        Aberturas <span className="italic text-[#c9a961]">premium</span>
      </h1>
    </motion.div>
  );
}
