import type { Product } from '@/types/product';

// Precios internos en pesos argentinos (ARS). No se muestran públicamente hasta que la tienda esté disponible.
export const products: Product[] = [
  { id: '1', slug: 'ventana-a30', name: 'Ventana A30', category: 'ventanas', material: 'aluminio', description: 'Aluminio · DVH', priceFrom: 480000, priceUnit: 'm2', image: '/products/bmr-product-placeholder.svg', featured: true },
  { id: '2', slug: 'puerta-pivot', name: 'Puerta Pivot', category: 'puertas', material: 'madera', description: 'Madera maciza', priceFrom: 1890000, priceUnit: 'unidad', image: '/products/bmr-product-placeholder.svg' },
  { id: '3', slug: 'oscilobatiente', name: 'Oscilobatiente', category: 'ventanas', material: 'pvc', description: 'PVC reforzado', priceFrom: 320000, priceUnit: 'm2', image: '/products/bmr-product-placeholder.svg' },
  { id: '4', slug: 'frente-integral', name: 'Frente integral', category: 'frentes', material: 'aluminio', description: 'Vidrio templado', priceFrom: 0, priceUnit: 'consultar', image: '/products/bmr-product-placeholder.svg' },
  { id: '5', slug: 'puerta-entrada', name: 'Puerta entrada', category: 'puertas', material: 'mixto', description: 'Madera + acero', priceFrom: 1250000, priceUnit: 'unidad', image: '/products/bmr-product-placeholder.svg' },
  { id: '6', slug: 'mosquitero', name: 'Mosquitero', category: 'accesorios', material: 'aluminio', description: 'Aluminio + tela', priceFrom: 95000, priceUnit: 'm2', image: '/products/bmr-product-placeholder.svg' },
  { id: '7', slug: 'ventana-minimal', name: 'Ventana Minimal', category: 'ventanas', material: 'mixto', description: 'Perfil ultrafino', priceFrom: 740000, priceUnit: 'm2', image: '/products/bmr-product-placeholder.svg' },
  { id: '8', slug: 'puerta-balcon', name: 'Puerta Balcón', category: 'puertas', material: 'pvc', description: 'Hermeticidad superior', priceFrom: 680000, priceUnit: 'unidad', image: '/products/bmr-product-placeholder.svg' },
  { id: '9', slug: 'ventana-modena-a30', name: 'Ventana Modena A30', category: 'ventanas', material: 'aluminio', description: 'Producto de prueba', priceFrom: 400000, priceUnit: 'unidad', image: '/products/bmr-product-placeholder.svg', featured: true },
];
