'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';

import type { Product } from '@/types/product';
import { useCart } from '@/lib/cart-store';
import { SHOP_CHECKOUT_ENABLED } from '@/lib/feature-flags';

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)'
  }
};

const formatPrice = (price: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);

export function ProductCard({ product }: { product: Product; priority?: boolean }) {
  const reduceMotion = useReducedMotion();
  const { addItem, openCart } = useCart();

  const handleAdd = () => {
    if (!SHOP_CHECKOUT_ENABLED) return;

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.priceFrom,
      priceUnit: product.priceUnit,
      image: product.image,
      metros: product.priceUnit === 'm2' ? 1 : undefined
    });
    openCart();
  };

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
          <span className="font-editorial text-sm text-[#c9a961]">{product.priceUnit === 'consultar' ? 'A confirmar' : `Desde ${formatPrice(product.priceFrom)}`}</span>
          <ArrowRight size={14} className="text-[#c9a961]" />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!SHOP_CHECKOUT_ENABLED || product.priceUnit === 'consultar' || product.priceFrom <= 0}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#c9a961]/60 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#c9a961] transition hover:bg-[#c9a961] hover:text-[#0a1733] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag size={14} />
          {SHOP_CHECKOUT_ENABLED ? 'Agregar al carrito' : 'Próximamente'}
        </button>
      </div>
    </motion.div>
  );
}
