import type { Product } from '@/types/product';

// Precios internos en pesos argentinos (ARS). No se muestran públicamente hasta que la tienda esté disponible.
export const products: Product[] = [
  {
    id: '1',
    slug: 'ventana-corrediza-a40',
    name: 'Ventana Corrediza A40',
    category: 'ventanas',
    material: 'aluminio',
    description: 'Ventana Corrediza A40 de aluminio · DVH',
    longDescription:
      'Ventana Corrediza A40 de aluminio pensada para obras residenciales y comerciales que buscan terminaciones premium, buena prestación térmica y una resolución prolija lista para coordinar con el equipo de BMR Group.',
    // TODO verificar que exista /productos/ventana-corrediza-a40-portada.webp; si falta, la UI conserva el placeholder navy.
    imagenPortada: '/productos/ventana-corrediza-a40-portada.webp',
    // TODO verificar que existan las imágenes de galería; las rutas faltantes caen al placeholder navy.
    imagenes: [
      '/productos/ventana-corrediza-a40-portada.webp',
      '/productos/ventana-corrediza-a40-1.webp',
      '/productos/ventana-corrediza-a40-2.webp',
      '/productos/ventana-corrediza-a40-3.webp'
    ],
    imagenAlt: 'Ventana Corrediza A40 de aluminio instalada en living',
    priceFrom: 100,
    priceUnit: 'unidad',
    image: '/products/bmr-product-placeholder.svg',
    featured: true,
    variants: [
      { id: '150x100', label: '150 × 100', type: 'standard', dimensions: { width: 150, height: 100, unit: 'cm' } },
      { id: '200x200', label: '200 × 200', type: 'standard', dimensions: { width: 200, height: 200, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ]
  },
  {
    id: '2',
    slug: 'puerta-pivot',
    name: 'Puerta Pivot',
    category: 'puertas',
    material: 'madera',
    description: 'Madera maciza',
    // TODO verificar que exista /productos/puerta-pivot-portada.webp; si falta, la UI conserva el placeholder navy.
    imagenPortada: '/productos/puerta-pivot-portada.webp',
    // TODO verificar que existan las imágenes de galería; las rutas faltantes caen al placeholder navy.
    imagenes: [
      '/productos/puerta-pivot-portada.webp',
      '/productos/puerta-pivot-1.webp',
      '/productos/puerta-pivot-2.webp',
      '/productos/puerta-pivot-3.webp'
    ],
    imagenAlt: 'Puerta Pivot de madera maciza instalada en acceso principal',
    priceFrom: 1890000,
    priceUnit: 'unidad',
    image: '/products/bmr-product-placeholder.svg',
    variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ]
  },
  {
    id: '3',
    slug: 'oscilobatiente',
    name: 'Oscilobatiente',
    category: 'ventanas',
    material: 'pvc',
    description: 'PVC reforzado',
    // TODO verificar que exista /productos/oscilobatiente-portada.webp; si falta, la UI conserva el placeholder navy.
    imagenPortada: '/productos/oscilobatiente-portada.webp',
    // TODO verificar que existan las imágenes de galería; las rutas faltantes caen al placeholder navy.
    imagenes: [
      '/productos/oscilobatiente-portada.webp',
      '/productos/oscilobatiente-1.webp',
      '/productos/oscilobatiente-2.webp',
      '/productos/oscilobatiente-3.webp'
    ],
    imagenAlt: 'Ventana oscilobatiente de PVC reforzado instalada en ambiente interior',
    priceFrom: 320000,
    priceUnit: 'm2',
    image: '/products/bmr-product-placeholder.svg',
    variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ]
  },
  {
    id: '4',
    slug: 'frente-integral',
    name: 'Frente integral',
    category: 'frentes',
    material: 'aluminio',
    description: 'Vidrio templado',
    // TODO verificar que exista /productos/frente-integral-portada.webp; si falta, la UI conserva el placeholder navy.
    imagenPortada: '/productos/frente-integral-portada.webp',
    // TODO verificar que existan las imágenes de galería; las rutas faltantes caen al placeholder navy.
    imagenes: [
      '/productos/frente-integral-portada.webp',
      '/productos/frente-integral-1.webp',
      '/productos/frente-integral-2.webp',
      '/productos/frente-integral-3.webp'
    ],
    imagenAlt: 'Frente integral de aluminio y vidrio templado en fachada comercial',
    priceFrom: 0,
    priceUnit: 'consultar',
    image: '/products/bmr-product-placeholder.svg',
    variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ]
  },
  {
    id: '5',
    slug: 'puerta-entrada',
    name: 'Puerta entrada',
    category: 'puertas',
    material: 'mixto',
    description: 'Madera + acero',
    // TODO verificar que exista /productos/puerta-entrada-portada.webp; si falta, la UI conserva el placeholder navy.
    imagenPortada: '/productos/puerta-entrada-portada.webp',
    // TODO verificar que existan las imágenes de galería; las rutas faltantes caen al placeholder navy.
    imagenes: [
      '/productos/puerta-entrada-portada.webp',
      '/productos/puerta-entrada-1.webp',
      '/productos/puerta-entrada-2.webp',
      '/productos/puerta-entrada-3.webp'
    ],
    imagenAlt: 'Puerta de entrada de madera y acero instalada en vivienda',
    priceFrom: 1250000,
    priceUnit: 'unidad',
    image: '/products/bmr-product-placeholder.svg',
    variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ]
  },
  {
    id: '6',
    slug: 'mosquitero',
    name: 'Mosquitero',
    category: 'accesorios',
    material: 'aluminio',
    description: 'Aluminio + tela',
    // TODO verificar que exista /productos/mosquitero-portada.webp; si falta, la UI conserva el placeholder navy.
    imagenPortada: '/productos/mosquitero-portada.webp',
    // TODO verificar que existan las imágenes de galería; las rutas faltantes caen al placeholder navy.
    imagenes: [
      '/productos/mosquitero-portada.webp',
      '/productos/mosquitero-1.webp',
      '/productos/mosquitero-2.webp',
      '/productos/mosquitero-3.webp'
    ],
    imagenAlt: 'Mosquitero de aluminio con tela instalado en ventana',
    priceFrom: 95000,
    priceUnit: 'm2',
    image: '/products/bmr-product-placeholder.svg',
    variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ]
  },
  {
    id: '7',
    slug: 'ventana-minimal',
    name: 'Ventana Minimal',
    category: 'ventanas',
    material: 'mixto',
    description: 'Perfil ultrafino',
    // TODO verificar que exista /productos/ventana-minimal-portada.webp; si falta, la UI conserva el placeholder navy.
    imagenPortada: '/productos/ventana-minimal-portada.webp',
    // TODO verificar que existan las imágenes de galería; las rutas faltantes caen al placeholder navy.
    imagenes: [
      '/productos/ventana-minimal-portada.webp',
      '/productos/ventana-minimal-1.webp',
      '/productos/ventana-minimal-2.webp',
      '/productos/ventana-minimal-3.webp'
    ],
    imagenAlt: 'Ventana Minimal de perfil ultrafino instalada en obra contemporánea',
    priceFrom: 740000,
    priceUnit: 'm2',
    image: '/products/bmr-product-placeholder.svg',
    variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ]
  },
  {
    id: '8',
    slug: 'puerta-balcon',
    name: 'Puerta Balcón',
    category: 'puertas',
    material: 'pvc',
    description: 'Hermeticidad superior',
    // TODO verificar que exista /productos/puerta-balcon-portada.webp; si falta, la UI conserva el placeholder navy.
    imagenPortada: '/productos/puerta-balcon-portada.webp',
    // TODO verificar que existan las imágenes de galería; las rutas faltantes caen al placeholder navy.
    imagenes: [
      '/productos/puerta-balcon-portada.webp',
      '/productos/puerta-balcon-1.webp',
      '/productos/puerta-balcon-2.webp',
      '/productos/puerta-balcon-3.webp'
    ],
    imagenAlt: 'Puerta Balcón de PVC con hermeticidad superior instalada en living',
    priceFrom: 680000,
    priceUnit: 'unidad',
    image: '/products/bmr-product-placeholder.svg',
    variants: [
      { id: '120x120', label: '120 × 120', type: 'standard', dimensions: { width: 120, height: 120, unit: 'cm' } },
      { id: '180x120', label: '180 × 120', type: 'standard', dimensions: { width: 180, height: 120, unit: 'cm' } },
      { id: 'custom', label: 'A medida', type: 'custom' }
    ]
  }
];
