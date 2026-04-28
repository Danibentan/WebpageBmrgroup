'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/product';

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [imageError, setImageError] = useState(false);
  const reduceMotion = useReducedMotion();

  const priceLabel =
    product.priceUnit === 'consultar'
      ? 'Consultar'
      : `USD ${product.priceFrom.toLocaleString('es-AR')}${product.priceUnit === 'm2' ? '/m²' : ''}`;

  return (
    <motion.div variants={reduceMotion ? undefined : cardVariants}>
      <Link
        href={`/tienda/${product.slug}`}
        aria-label={`Ver detalles de ${product.name}`}
        className="group block overflow-hidden rounded-md border border-[#c9a961]/15 bg-white/[0.03] transition-colors hover:border-[#c9a961]/40 focus:outline-none focus:ring-2 focus:ring-[#c9a961]/50"
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
        <div className="p-4">
          <h3 className="font-editorial text-base leading-tight text-white">{product.name}</h3>
          <p className="mb-2 mt-1 text-[10px] text-white/50">{product.description}</p>
          <div className="flex items-center justify-between border-t border-white/5 pt-2">
            <span className="font-editorial text-sm text-[#c9a961]">{priceLabel}</span>
            <ArrowRight size={14} className="text-[#c9a961] transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
