'use client';

import { useMemo, useState } from 'react';

import type { ProductDetail } from '@/lib/product-detail';
import { AddToCartButton } from './AddToCartButton';
import { OptionsSelector } from './OptionsSelector';
import { SizeSelector } from './SizeSelector';

type ProductPurchaseControlsProps = {
  product: ProductDetail;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);

export function ProductPurchaseControls({ product }: ProductPurchaseControlsProps) {
  const [selectedMeasure, setSelectedMeasure] = useState(product.medidas[0] ?? { id: 'a-medida', label: 'A medida', value: 'a-medida', precio: null, esPersonalizada: true });
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);

  const selectedOptions = useMemo(
    () => product.opcionales.filter((option) => selectedOptionIds.includes(option.id)),
    [product.opcionales, selectedOptionIds]
  );

  const toggleOption = (optionId: string) => {
    setSelectedOptionIds((current) =>
      current.includes(optionId) ? current.filter((entry) => entry !== optionId) : [...current, optionId]
    );
  };

  return (
    <div className="space-y-7">
      <div className="rounded-3xl border border-[#14223D]/10 bg-[#EDE5D0]/50 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B6655]">Precio base</p>
        <p className="mt-2 font-editorial text-3xl italic text-[#14223D]">
          {typeof selectedMeasure.precio === 'number' ? formatPrice(selectedMeasure.precio) : 'Precio a cotizar'}
        </p>
        {typeof selectedMeasure.precio === 'number' ? <p className="mt-1 text-xs text-[#6B6655]">IVA incluido</p> : null}
      </div>

      <SizeSelector measures={product.medidas} selectedMeasure={selectedMeasure} onChange={setSelectedMeasure} />
      <OptionsSelector options={product.opcionales} selectedOptionIds={selectedOptionIds} onToggle={toggleOption} />
      <AddToCartButton product={product} selectedMeasure={selectedMeasure} selectedOptions={selectedOptions} />
    </div>
  );
}
