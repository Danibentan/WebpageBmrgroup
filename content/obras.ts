import { getPublicGalleryPaths } from '@/lib/publicGallery';

export type Obra = {
  slug: string;
  title: string;
  description: string;
  category: 'RESIDENCIAL' | 'CORPORATIVO';
  location: string;
  meta: string;
  image: string;
  detailDescription: string;
  gallery: string[];
};

export const obras: Obra[] = [
  {
    slug: 'casa-la-serena',
    title: 'Casa La serena',
    description: 'Aberturas de gran tama;o y porte para generar espacios luminosos aprovechando la luz natural.',
    category: 'RESIDENCIAL',
    location: 'Escobar, Buenos Aires',
    meta: '2025 · 280 m² · Corredizas DVH',
    image: '/obras/casa-la-serena-1.jpg',
    detailDescription:
      'Se ejecutó un sistema integral de aberturas corredizas de gran formato, priorizando entrada de luz natural, continuidad visual interior-exterior y alta prestación térmica/acústica.',
    gallery: [
      '/obras/casa-la-serena-1.jpg',
      '/obras/casa-la-serena-2.jpg',
      '/obras/casa-la-serena-3.jpg',
      '/obras/casa-la-serena-5.jpg',
      '/obras/casa-la-serena-6.jpg'
    ]
  },
  {
    slug: 'casa-la-inquieta',
    title: 'casa la inquieta',
    description: 'aberturas premiun .',
    category: 'RESIDENCIAL',
    location: 'escobar, Buenos Aires',
    meta: '2026 · 1.200 m² · trabajo a medida pedido por cliente',
    image: '/obras/la-inquieta-1.jpg',
    detailDescription:
      'se realizo trabajo de colocacion de aberturas en toda la residencia.',
    gallery: [  
      '/obras/la-inquieta-1.jpg',
      '/obras/la-inquieta-2.jpg',
      '/obras/la-inquieta-3.jpg',
      '/obras/la-inquieta-4.jpg',
      '/obras/la-inquieta-5.jpg',
      '/obras/la-inquieta-6.jpg'
     ]
  }
];
