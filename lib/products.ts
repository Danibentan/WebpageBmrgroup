import type { Product } from '@/types/product';

export const products: Product[] = [
  { id: '1', slug: 'ventana-a30', name: 'Ventana A30', category: 'ventanas', material: 'aluminio', description: 'Aluminio · DVH', priceFrom: 480, priceUnit: 'm2', image: '/products/ventana-a30.jpg', featured: true },
  { id: '2', slug: 'puerta-pivot', name: 'Puerta Pivot', category: 'puertas', material: 'madera', description: 'Madera maciza', priceFrom: 1890, priceUnit: 'unidad', image: '/products/puerta-pivot.jpg' },
  { id: '3', slug: 'oscilobatiente', name: 'Oscilobatiente', category: 'ventanas', material: 'pvc', description: 'PVC reforzado', priceFrom: 320, priceUnit: 'm2', image: '/products/oscilobatiente.jpg' },
  { id: '4', slug: 'frente-integral', name: 'Frente integral', category: 'frentes', material: 'aluminio', description: 'Vidrio templado', priceFrom: 0, priceUnit: 'consultar', image: '/products/frente-integral.jpg' },
  { id: '5', slug: 'puerta-entrada', name: 'Puerta entrada', category: 'puertas', material: 'mixto', description: 'Madera + acero', priceFrom: 1250, priceUnit: 'unidad', image: '/products/puerta-entrada.jpg' },
  { id: '6', slug: 'mosquitero', name: 'Mosquitero', category: 'accesorios', material: 'aluminio', description: 'Aluminio + tela', priceFrom: 95, priceUnit: 'm2', image: '/products/mosquitero.jpg' },
  { id: '7', slug: 'ventana-minimal', name: 'Ventana Minimal', category: 'ventanas', material: 'mixto', description: 'Perfil ultrafino', priceFrom: 740, priceUnit: 'm2', image: '/products/ventana-minimal.jpg' },
  { id: '8', slug: 'puerta-balcon', name: 'Puerta Balcón', category: 'puertas', material: 'pvc', description: 'Hermeticidad superior', priceFrom: 680, priceUnit: 'unidad', image: '/products/puerta-balcon.jpg' }
];
