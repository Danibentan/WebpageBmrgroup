'use client';

import type { ProductMeasure } from '@/lib/product-detail';

type SizeSelectorProps = {
  measures: ProductMeasure[];
  selectedMeasure: ProductMeasure;
  onChange: (measure: ProductMeasure) => void;
};

export function SizeSelector({ measures, selectedMeasure, onChange }: SizeSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B6655]">Medida</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Seleccionar medida">
        {measures.map((measure) => {
          const isActive = measure.value === selectedMeasure.value;

          return (
            <button
              key={measure.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(measure)}
              className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 focus:ring-offset-[#F4EEDE] ${
                isActive
                  ? 'border-[1.5px] border-[#14223D] bg-[#14223D] text-[#F4EEDE]'
                  : 'border-[#14223D]/20 bg-[#F4EEDE]/60 text-[#14223D] hover:border-[#14223D]/45'
              }`}
            >
              {measure.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
