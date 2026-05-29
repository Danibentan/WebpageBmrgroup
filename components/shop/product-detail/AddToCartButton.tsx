'use client';

import { useEffect, useState } from 'react';

import type { ProductDetail, ProductMeasure, ProductOption } from '@/lib/product-detail';
import { useCart } from '@/lib/cart-store';

type AddToCartButtonProps = {
  product: ProductDetail;
  selectedMeasure: ProductMeasure;
  selectedOptions: ProductOption[];
};

export function AddToCartButton({ product, selectedMeasure, selectedOptions }: AddToCartButtonProps) {
  const [status, setStatus] = useState<'idle' | 'added'>('idle');
  const { addItem, openCart } = useCart();

  useEffect(() => {
    if (status !== 'added') return undefined;

    const timeout = window.setTimeout(() => setStatus('idle'), 1800);
    return () => window.clearTimeout(timeout);
  }, [status]);

  if (selectedMeasure.precio === null) {
    return (
      <a
        href={`/contacto?producto=${product.id}&medida=${selectedMeasure.id}`}
        className="flex w-full items-center justify-center rounded-full bg-[#14223D] px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#F4EEDE] transition hover:bg-[#1d3158] focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 focus:ring-offset-[#F4EEDE]"
      >
        Pedir cotización
      </a>
    );
  }

  const handleAdd = () => {
    addItem({
      id: `${product.id}-${selectedMeasure.id}`,
      slug: product.slug,
      name: `${product.nombre} — ${selectedMeasure.label}`,
      description: `${product.descripcionLarga} Medida seleccionada: ${selectedMeasure.label}.`,
      price: selectedMeasure.precio,
      priceUnit: 'unidad',
      image: product.imagenes[0] ?? '/products/bmr-product-placeholder.svg'
    });

    selectedOptions.forEach((option) => {
      if (typeof option.precio !== 'number') return;

      addItem({
        id: `${product.id}-${selectedMeasure.id}-${option.id}`,
        slug: product.slug,
        name: `${product.nombre} — ${option.nombre}`,
        description: `Opcional para ${product.nombre} (${selectedMeasure.label}).`,
        price: option.precio,
        priceUnit: 'unidad',
        image: product.imagenes[0] ?? '/products/bmr-product-placeholder.svg'
      });
    });

    setStatus('added');
    openCart();
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="w-full rounded-full bg-[#14223D] px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#F4EEDE] transition hover:bg-[#1d3158] focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 focus:ring-offset-[#F4EEDE]"
      aria-label={`Agregar al carrito medida ${selectedMeasure.label} con ${selectedOptions.length} opcionales seleccionados`}
    >
      {status === 'added' ? 'Agregado ✓' : 'Agregar al carrito'}
    </button>
  );
}
