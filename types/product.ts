export type ProductCategory = 'ventanas' | 'puertas' | 'frentes' | 'accesorios';
export type ProductMaterial = 'aluminio' | 'pvc' | 'madera' | 'mixto';


export type ProductVariant = {
  id: string;
  label: string;
  type: 'standard' | 'custom';
  dimensions?: { width: number; height: number; unit: 'cm' };
};

export type ProductMeasure = {
  id: string;
  label: string;
  precio: number | null;
  esPersonalizada?: boolean;
};

export type ProductOption = {
  id: string;
  nombre: string;
  precio: number | null;
};

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  material: ProductMaterial;
  description: string;
  longDescription?: string;
  imagenPortada?: string;
  imagenes?: string[];
  imagenAlt: string;
  medidas?: ProductMeasure[];
  opcionales?: ProductOption[];
  priceFrom: number | null;
  priceUnit: 'm2' | 'unidad' | 'consultar';
  disponibleParaCompra: boolean;
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
