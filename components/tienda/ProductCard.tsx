'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';

import { useCart } from '@/lib/cart-store';
import type { Product } from '@/types/product';

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)'
  }
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [imageError, setImageError] = useState(false);
  const reduceMotion = useReducedMotion();

  const priceLabel =
    product.priceUnit === 'consultar'
      ? 'Consultar'
      : `USD ${product.priceFrom.toLocaleString('es-AR')}${product.priceUnit === 'm2' ? '/m²' : ''}`;

  const handleAddToCart = () => {
    useCart.getState().addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.priceFrom,
      priceUnit: product.priceUnit,
      image: product.image,
      metros: product.priceUnit === 'm2' ? 1 : undefined
    });
    useCart.getState().openCart();
  };

  return (
    <motion.div variants={reduceMotion ? undefined : cardVariants} className="rounded-md border border-[#c9a961]/15 bg-white/[0.03]">
      <Link
        href={`/tienda/${product.slug}`}
        aria-label={`Ver detalles de ${product.name}`}
        className="group block overflow-hidden rounded-t-md transition-colors hover:border-[#c9a961]/40 focus:outline-none focus:ring-2 focus:ring-[#c9a961]/50"
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1a2d4a] to-[#0a1733]">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2d4a] to-[#0a1733]" aria-hidden="true" />
          )}
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-editorial text-base leading-tight text-white">{product.name}</h3>
        <p className="mb-2 mt-1 text-[10px] text-white/50">{product.description}</p>
        <div className="flex items-center justify-between border-t border-white/5 pt-2">
          <span className="font-editorial text-sm text-[#c9a961]">{priceLabel}</span>
          <ArrowRight size={14} className="text-[#c9a961]" />
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#c9a961]/40 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#c9a961] transition-colors hover:bg-[#c9a961] hover:text-[#0a1733]"
        >
          <ShoppingBag size={14} />
          Agregar al carrito
        </button>
      </div>
    </motion.div>
  );
}
