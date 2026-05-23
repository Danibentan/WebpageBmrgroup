import type { Product } from '@/types/product';

// Precios internos en pesos argentinos (ARS). No se muestran públicamente hasta que la tienda esté disponible.
export const products: Product[] = [
  { id: '1', slug: 'ventana-modena-a30', name: 'Ventana Modena A30', category: 'ventanas', material: 'aluminio', description: 'Aluminio · DVH', priceFrom: 100, priceUnit: 'unidad', image: '/products/bmr-product-placeholder.svg', featured: true, variants: [
      { id: '150x100', label: '150 × 100', type: 'standard', dimensions: { width: 150, height: 100, unit: 'cm' } },
      { id: '200x200', label: '200 × 200', type: 'standard', dimensions: { width: 200, height: 200, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ] },
  { id: '2', slug: 'puerta-pivot', name: 'Puerta Pivot', category: 'puertas', material: 'madera', description: 'Madera maciza', priceFrom: 1890000, priceUnit: 'unidad', image: '/products/bmr-product-placeholder.svg', variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ] },
  { id: '3', slug: 'oscilobatiente', name: 'Oscilobatiente', category: 'ventanas', material: 'pvc', description: 'PVC reforzado', priceFrom: 320000, priceUnit: 'm2', image: '/products/bmr-product-placeholder.svg', variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ] },
  { id: '4', slug: 'frente-integral', name: 'Frente integral', category: 'frentes', material: 'aluminio', description: 'Vidrio templado', priceFrom: 0, priceUnit: 'consultar', image: '/products/bmr-product-placeholder.svg', variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ] },
  { id: '5', slug: 'puerta-entrada', name: 'Puerta entrada', category: 'puertas', material: 'mixto', description: 'Madera + acero', priceFrom: 1250000, priceUnit: 'unidad', image: '/products/bmr-product-placeholder.svg', variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ] },
  { id: '6', slug: 'mosquitero', name: 'Mosquitero', category: 'accesorios', material: 'aluminio', description: 'Aluminio + tela', priceFrom: 95000, priceUnit: 'm2', image: '/products/bmr-product-placeholder.svg', variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ] },
  { id: '7', slug: 'ventana-minimal', name: 'Ventana Minimal', category: 'ventanas', material: 'mixto', description: 'Perfil ultrafino', priceFrom: 740000, priceUnit: 'm2', image: '/products/bmr-product-placeholder.svg', variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ] },
  { id: '8', slug: 'puerta-balcon', name: 'Puerta Balcón', category: 'puertas', material: 'pvc', description: 'Hermeticidad superior', priceFrom: 680000, priceUnit: 'unidad', image: '/products/bmr-product-placeholder.svg', variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ] },
];
