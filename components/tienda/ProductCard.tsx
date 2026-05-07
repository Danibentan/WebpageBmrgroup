'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';

import type { Product } from '@/types/product';

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)'
  }
};

export function ProductCard({ product }: { product: Product; priority?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div variants={reduceMotion ? undefined : cardVariants} className="rounded-md border border-[#c9a961]/15 bg-white/[0.03]">
      <Link
        href={`/tienda/${product.slug}`}
        aria-label={`Ver detalles de ${product.name}`}
        className="group block overflow-hidden rounded-t-md transition-colors hover:border-[#c9a961]/40 focus:outline-none focus:ring-2 focus:ring-[#c9a961]/50"
      >
        <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--bg-elevated-1)] to-[var(--bg-elevated-2)]">
          <p className="font-editorial text-2xl text-[var(--bmr-soft-white)]">Próximamente</p>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-editorial text-base leading-tight text-[var(--bmr-soft-white)]">{product.name}</h3>
        <p className="mb-2 mt-1 text-[10px] text-[var(--bmr-soft-white)]/50">{product.description}</p>
        <div className="flex items-center justify-between border-t border-white/5 pt-2">
          <span className="font-editorial text-sm text-[#c9a961]">Próximamente</span>
          <ArrowRight size={14} className="text-[#c9a961]" />
        </div>
        <button
          type="button"
          disabled
          className="mt-3 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[#c9a961]/40 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#c9a961] opacity-70"
        >
          <ShoppingBag size={14} />
          Tienda próximamente
        </button>
      </div>
    </motion.div>
  );
}
