import { products } from '@/lib/products';
import { SHOP_CHECKOUT_ENABLED } from '@/lib/feature-flags';
import type { Product, ProductCategory, ProductMaterial } from '@/types/product';

export type ProductMeasure = {
  label: string;
  value: string;
};

export type ProductOption = {
  id: string;
  nombre: string;
  precio?: number | null;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductDetail = {
  id: string;
  slug: string;
  nombre: string;
  categoria: ProductCategory;
  material: ProductMaterial;
  esNuevo: boolean;
  descripcionLarga: string;
  imagenes: string[];
  medidas: ProductMeasure[];
  opcionales: ProductOption[];
  incluye: string[];
  especificaciones: ProductSpec[];
  disponible: boolean;
  precio: number;
  imageAlt: string;
};

const categoryLabels: Record<ProductCategory, string> = {
  ventanas: 'Ventanas',
  puertas: 'Puertas',
  frentes: 'Frentes',
  accesorios: 'Accesorios'
};

const materialLabels: Record<ProductMaterial, string> = {
  aluminio: 'Aluminio',
  pvc: 'PVC',
  madera: 'Madera',
  mixto: 'Mixto'
};

function buildDefaultDescription(product: Product) {
  return `${product.name} de ${materialLabels[product.material].toLowerCase()} pensado para obras residenciales y comerciales que buscan terminaciones premium, buena prestación térmica y una resolución prolija lista para coordinar con el equipo de BMR Group.`;
}

function buildDefaultMeasures(product: Product): ProductMeasure[] {
  const measures = product.variants.map((variant) => ({
    label: variant.label,
    value: variant.id
  }));

  return measures.length > 0 ? measures : [{ label: 'A medida', value: 'custom' }];
}

function buildDefaultOptions(product: Product): ProductOption[] {
  // TODO ajustar a CMS: reemplazar estos opcionales por los configurados para cada producto.
  return [
    { id: `${product.id}-mosquitero`, nombre: 'Mosquitero reforzado', precio: product.category === 'ventanas' ? 95000 : null },
    { id: `${product.id}-vidrio-seguridad`, nombre: 'Vidrio laminado de seguridad', precio: 140000 },
    { id: `${product.id}-color-especial`, nombre: 'Color especial a pedido', precio: null }
  ];
}

function buildDefaultIncludes(product: Product): string[] {
  // TODO ajustar a CMS: reemplazar por el alcance real de entrega/configuración del producto.
  return [
    'Asesoramiento técnico previo a la compra',
    `Producto en ${materialLabels[product.material].toLowerCase()} según configuración elegida`,
    'Revisión de medidas y compatibilidad con obra',
    'Coordinación de entrega con el equipo comercial'
  ];
}

function buildDefaultSpecs(product: Product): ProductSpec[] {
  // TODO ajustar a CMS: reemplazar por fichas técnicas específicas de cada línea.
  return [
    { label: 'Categoría', value: categoryLabels[product.category] },
    { label: 'Material', value: materialLabels[product.material] },
    { label: 'Terminación', value: product.description },
    { label: 'Unidad de precio', value: product.priceUnit === 'm2' ? 'Por m²' : product.priceUnit === 'unidad' ? 'Por unidad' : 'A consultar' }
  ];
}

export function adaptProductToDetail(product: Product): ProductDetail {
  return {
    id: product.id,
    slug: product.slug,
    nombre: product.name,
    categoria: product.category,
    material: product.material,
    esNuevo: Boolean(product.featured),
    // TODO ajustar a CMS: usar product.descripcionLarga cuando exista en el modelo real.
    descripcionLarga: product.longDescription ?? buildDefaultDescription(product),
    // TODO ajustar a CMS: usar product.imagenes cuando exista en el modelo real.
    imagenes: [product.image].filter(Boolean),
    medidas: buildDefaultMeasures(product),
    opcionales: buildDefaultOptions(product),
    incluye: buildDefaultIncludes(product),
    especificaciones: buildDefaultSpecs(product),
    disponible: SHOP_CHECKOUT_ENABLED && product.priceUnit !== 'consultar' && product.priceFrom > 0,
    precio: product.priceFrom,
    imageAlt: product.name
  };
}

export function getProductDetailBySlug(slug: string): ProductDetail | null {
  const product = products.find((entry) => entry.slug === slug);
  return product ? adaptProductToDetail(product) : null;
}

export function getProductDetailSlugs() {
  return products.map((product) => ({ slug: product.slug }));
}

export function getCategoryLabel(category: ProductCategory) {
  return categoryLabels[category];
}

export function getMaterialLabel(material: ProductMaterial) {
  return materialLabels[material];
}
