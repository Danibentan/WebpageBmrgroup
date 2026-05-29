'use client';

import { useEffect, useState } from 'react';

import type { ProductMeasure, ProductOption } from '@/lib/product-detail';

type AddToCartButtonProps = {
  disponible: boolean;
  selectedMeasure: ProductMeasure;
  selectedOptions: ProductOption[];
};

export function AddToCartButton({ disponible, selectedMeasure, selectedOptions }: AddToCartButtonProps) {
  const [status, setStatus] = useState<'idle' | 'pending'>('idle');

  useEffect(() => {
    if (status !== 'pending') return undefined;

    const timeout = window.setTimeout(() => setStatus('idle'), 1800);
    return () => window.clearTimeout(timeout);
  }, [status]);

  if (!disponible) {
    return (
      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-full bg-[#14223D]/45 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#F4EEDE]/80"
      >
        Próximamente
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setStatus('pending')}
      className="w-full rounded-full bg-[#14223D] px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#F4EEDE] transition hover:bg-[#1d3158] focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 focus:ring-offset-[#F4EEDE]"
      aria-label={`Agregar al carrito medida ${selectedMeasure.label} con ${selectedOptions.length} opcionales seleccionados`}
    >
      {status === 'pending' ? 'Agregar en fase B' : 'Agregar al carrito'}
    </button>
  );
}
