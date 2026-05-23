'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProductVariant } from '@/types/product';

interface Props {
  variants: ProductVariant[];
  onChange?: (variant: ProductVariant) => void;
}

export function SizeDropdown({ variants, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(variants[0]?.id);
  const ref = useRef<HTMLDivElement>(null);

  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];
  const standards = variants.filter((v) => v.type === 'standard');
  const customs = variants.filter((v) => v.type === 'custom');

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const handleSelect = (variant: ProductVariant) => {
    setSelectedId(variant.id);
    setIsOpen(false);
    onChange?.(variant);
  };

  if (!selected) return null;

  return (
    <div className={`size-dropdown ${isOpen ? 'is-open' : ''} ${selected.type === 'custom' ? 'has-custom' : ''}`} ref={ref}>
      <p className="size-dropdown__label">Medida</p>
      <button
        type="button"
        className="size-dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="size-dropdown__current">
          <span>{selected.label}</span>
          {selected.type === 'standard' ? <span className="size-dropdown__unit">cm</span> : null}
        </span>
        <i className="ti ti-chevron-down size-dropdown__chevron" aria-hidden="true" />
      </button>

      <div className="size-dropdown__menu" role="listbox">
        <p className="size-dropdown__menu-header">Medidas de catálogo</p>
        {standards.map((variant) => (
          <button
            key={variant.id}
            type="button"
            role="option"
            aria-selected={selectedId === variant.id}
            className={`size-dropdown__opt ${selectedId === variant.id ? 'is-selected' : ''}`}
            onClick={() => handleSelect(variant)}
          >
            <i className="ti ti-ruler-2 size-dropdown__opt-icon" aria-hidden="true" />
            <span className="size-dropdown__opt-text">
              <span className="size-dropdown__opt-text-main">{variant.label}</span>
              <span className="size-dropdown__opt-hint">cm</span>
            </span>
            <i className="ti ti-check size-dropdown__opt-check" aria-hidden="true" />
          </button>
        ))}

        {customs.length > 0 ? (
          <>
            <hr className="size-dropdown__divider" />
            <p className="size-dropdown__menu-header">Personalizado</p>
            {customs.map((variant) => (
              <button
                key={variant.id}
                type="button"
                role="option"
                aria-selected={selectedId === variant.id}
                className={`size-dropdown__opt size-dropdown__opt--custom ${selectedId === variant.id ? 'is-selected' : ''}`}
                onClick={() => handleSelect(variant)}
              >
                <i className="ti ti-pencil size-dropdown__opt-icon" aria-hidden="true" />
                <span className="size-dropdown__opt-text">
                  <span className="size-dropdown__opt-text-main">{variant.label}</span>
                </span>
                <i className="ti ti-check size-dropdown__opt-check" aria-hidden="true" />
              </button>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}
