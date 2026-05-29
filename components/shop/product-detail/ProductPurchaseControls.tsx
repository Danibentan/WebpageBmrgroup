'use client';

import { useMemo, useState } from 'react';

import type { ProductDetail } from '@/lib/product-detail';
import { AddToCartButton } from './AddToCartButton';
import { OptionsSelector } from './OptionsSelector';
import { SizeSelector } from './SizeSelector';

type ProductPurchaseControlsProps = {
  product: ProductDetail;
};

export function ProductPurchaseControls({ product }: ProductPurchaseControlsProps) {
  const [selectedMeasure, setSelectedMeasure] = useState(product.medidas[0] ?? { label: 'A medida', value: 'custom' });
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
      <SizeSelector measures={product.medidas} selectedMeasure={selectedMeasure} onChange={setSelectedMeasure} />
      <OptionsSelector options={product.opcionales} selectedOptionIds={selectedOptionIds} onToggle={toggleOption} />
      <AddToCartButton disponible={product.disponible} selectedMeasure={selectedMeasure} selectedOptions={selectedOptions} />
    </div>
  );
}
