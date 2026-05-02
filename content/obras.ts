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
    description: 'Corredizas de gran formato con perfiles de baja visual y DVH para máxima entrada de luz.',
    category: 'RESIDENCIAL',
    location: 'Escobar, Buenos Aires',
    meta: '2024 · 280 m² · Corredizas DVH',
    image: '/obras/casa-la-serena-1.jpg',
    detailDescription:
      'Se ejecutó un sistema integral de aberturas corredizas de gran formato, priorizando entrada de luz natural, continuidad visual interior-exterior y alta prestación térmica/acústica.',
    gallery: [
      '/obras/casa-la-serena-1.jpg',
      '/obras/casa-la-serena-2.jpg',
      '/obras/casa-la-serena-3.jpg',
      '/obras/casa-la-serena-4.jpg',
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
  },
  {
    slug: 'oficina-corporativa',
    title: 'Oficinas Corporativa',
    description: 'Aberturas de operación intensiva para uso corporativo con foco en hermeticidad y durabilidad.',
    category: 'CORPORATIVO',
    location: 'Tigre, Buenos Aires',
    meta: '2025 · 850 m² · Aberturas hermético',
    image: '/obras/2d4d2c26-8f40-4212-9a3a-cf1906bad348.JPG',
    detailDescription: 'Proyecto corporativo con soluciones de uso intensivo, enfocadas en durabilidad, control solar y confort acústico para operación diaria.',
    gallery: [
      '/obras/1dabeacb-8518-4320-ab34-56790934185c.JPG',
      '/obras/2d4d2c26-8f40-4212-9a3a-cf1906bad348.JPG',
      '/obras/46fe44fd-bde7-4609-a812-4fbbfd407ab8.JPG',
      '/obras/e4c1855e-fbc3-465a-8ffd-a4beb32860cf.JPG'

    ]
  },
  {
    slug: 'casa-boseque-sur',
    title: 'Casa Bosque Sur',
    description: 'Puertas ventana y paños fijos panorámicos para integración interior-exterior.',
    category: 'RESIDENCIAL',
    location: 'Bariloche, Río Negro',
    meta: '2024 · 420 m² · Paños fijos panorámicos',
    image: '/obras/casa-bosque-sur.webp',
    detailDescription: 'Se instalaron paños panorámicos y puertas ventana para ampliar vistas, mejorar iluminación natural y reforzar el vínculo con el entorno.',
    gallery: []
  }
];
