'use client';

import { Check } from 'lucide-react';

import type { ProductOption } from '@/lib/product-detail';

type OptionsSelectorProps = {
  options: ProductOption[];
  selectedOptionIds: string[];
  onToggle: (optionId: string) => void;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);

export function OptionsSelector({ options, selectedOptionIds, onToggle }: OptionsSelectorProps) {
  if (options.length === 0) return null;

  return (
    <fieldset className="space-y-3">
      <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B6655]">Opcionales</legend>
      <div className="space-y-2">
        {options.map((option) => {
          const checked = selectedOptionIds.includes(option.id);

          return (
            <label
              key={option.id}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-[#14223D]/10 bg-[#F4EEDE]/55 p-3 text-sm text-[#14223D] transition hover:border-[#B8924A]/60"
            >
              <span className="flex min-w-0 items-center gap-3">
                <input type="checkbox" checked={checked} onChange={() => onToggle(option.id)} className="sr-only" />
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border transition ${
                    checked ? 'border-[#B8924A] bg-[#F4EEDE]' : 'border-[#14223D]/25 bg-transparent'
                  }`}
                >
                  {checked ? <Check size={14} strokeWidth={2.5} className="text-[#B8924A]" /> : null}
                </span>
                <span className="truncate">{option.nombre}</span>
              </span>
              <span className="flex-none text-xs font-medium text-[#6B6655]">
                {typeof option.precio === 'number' ? `+ ${formatPrice(option.precio)}` : '+ Consultar'}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
