export type ProductCategory = 'ventanas' | 'puertas' | 'frentes' | 'accesorios';
export type ProductMaterial = 'aluminio' | 'pvc' | 'madera' | 'mixto';


export type ProductVariant = {
  id: string;
  label: string;
  type: 'standard' | 'custom';
  dimensions?: { width: number; height: number; unit: 'cm' };
};

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  material: ProductMaterial;
  description: string;
  priceFrom: number;
  priceUnit: 'm2' | 'unidad' | 'consultar';
  image: string;
  featured?: boolean;
  variants: ProductVariant[];
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  priceUnit: 'm2' | 'unidad' | 'consultar';
  image: string;
  quantity: number;
  metros?: number;
}
