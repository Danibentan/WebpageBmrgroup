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
    title: 'Casa La inquieta',
    description: 'Sistema de carpintería técnica con control acústico y terminación premium para fachada continua.',
    category: 'RESIDENCIAL',
    location: 'Escobar, Buenos Aires',
    meta: '2024 · 1.200 m² · Carpintería técnica',
    image: '/obras/la-inquieta-1.jpg',
    detailDescription:
      'Se desarrolló una envolvente con carpintería técnica de alta exigencia, optimizando hermeticidad, aislación acústica y terminaciones premium para una imagen arquitectónica contemporánea.',
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
    slug: 'oficinas-costanera',
    title: 'Oficinas Costanera',
    description: 'Aberturas de operación intensiva para uso corporativo con foco en hermeticidad y durabilidad.',
    category: 'CORPORATIVO',
    location: 'Vicente López, Buenos Aires',
    meta: '2023 · 850 m² · Aberturas hermético',
    image: '/obras/oficinas-costanera.webp',
    detailDescription: 'Proyecto corporativo con soluciones de uso intensivo, enfocadas en durabilidad, control solar y confort acústico para operación diaria.',
    gallery: []
  },
  {
    slug: 'casa-bosque-sur',
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
