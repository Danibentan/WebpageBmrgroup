import type { Product } from '@/types/product';

export type ShopCategory = 'all' | 'ventanas' | 'puertas' | 'frentes';
export type ShopMaterial = 'aluminio' | 'pvc';
export type ShopAvailability = 'coming-soon';

export type ShopProduct = Product & {
  available: boolean;
  specs: string;
  isNew?: boolean;
};
