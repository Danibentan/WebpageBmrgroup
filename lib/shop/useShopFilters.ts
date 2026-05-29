'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { ShopAvailability, ShopCategory, ShopMaterial, ShopProduct } from './product-types';

function parseSet<T extends string>(raw: string | null): Set<T> {
  if (!raw) return new Set<T>();
  return new Set(raw.split(',').filter(Boolean) as T[]);
}

export function useShopFilters(products: ShopProduct[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialCategory = (searchParams.get('categoria') as ShopCategory) || 'all';
  const [category, setCategory] = useState<ShopCategory>(initialCategory);
  const [materials, setMaterials] = useState<Set<ShopMaterial>>(parseSet<ShopMaterial>(searchParams.get('material')));
  const [availability, setAvailability] = useState<Set<ShopAvailability>>(parseSet<ShopAvailability>(searchParams.get('disponibilidad')));

  const syncUrl = (nextCategory: ShopCategory, nextMaterials: Set<ShopMaterial>, nextAvailability: Set<ShopAvailability>) => {
    const params = new URLSearchParams();
    if (nextCategory !== 'all') params.set('categoria', nextCategory);
    if (nextMaterials.size > 0) params.set('material', [...nextMaterials].join(','));
    if (nextAvailability.size > 0) params.set('disponibilidad', [...nextAvailability].join(','));
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const updateCategory = (next: ShopCategory) => {
    setCategory(next);
    syncUrl(next, materials, availability);
  };

  const toggleMaterial = (material: ShopMaterial) => {
    const next = new Set(materials);
    if (next.has(material)) next.delete(material);
    else next.add(material);
    setMaterials(next);
    syncUrl(category, next, availability);
  };

  const toggleAvailability = (item: ShopAvailability) => {
    const next = new Set(availability);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    setAvailability(next);
    syncUrl(category, materials, next);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryPass = category === 'all' || product.category === category;
      const materialPass = materials.size === 0 || materials.has(product.material as ShopMaterial);
      const availabilityPass = availability.size === 0 || (availability.has('coming-soon') && !product.available);
      return categoryPass && materialPass && availabilityPass;
    });
  }, [products, category, materials, availability]);

  return { category, materials, availability, filteredProducts, updateCategory, toggleMaterial, toggleAvailability };
}
