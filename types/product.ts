export type ProductCategory = 'ventanas' | 'puertas' | 'frentes' | 'accesorios';
export type ProductMaterial = 'aluminio' | 'pvc' | 'madera' | 'mixto';

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
