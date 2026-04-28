export type CatalogMeta = {
  label: string;
  value: string;
};

export type CatalogLine = {
  slug: 'aluminio' | 'pvc' | 'madera';
  name: string;
  systems: string;
  description: string;
  pages: string;
  size: string;
  pdfPath: string;
  coverTitle: string;
  coverGradient: string;
};

export const featuredCatalog = {
  name: 'general',
  title: 'Catálogo general 2026',
  description:
    'Compendio completo de nuestras 24 líneas de aberturas en aluminio, PVC y madera. Incluye medidas estándar, prestaciones térmicas y acústicas, opciones de vidriado DVH y guía de selección por tipo de obra.',
  pdfPath: '/catalogos/bmr-catalogo-general-2026.pdf',
  pdfSize: '18 MB',
  meta: [
    { label: 'PÁGINAS', value: '128' },
    { label: 'PESO', value: '18 MB' },
    { label: 'ACTUALIZADO', value: 'Mar 2026' }
  ] as CatalogMeta[]
} as const;

export const lineCatalogs: CatalogLine[] = [
  {
    slug: 'aluminio',
    name: 'Aluminio',
    systems: '12 SISTEMAS',
    description: 'Sistemas A30, Módena, Summa y Strato. Perfilería europea con DVH.',
    pages: '42 PÁGINAS',
    size: '8.2 MB',
    pdfPath: '/catalogos/bmr-aluminio-2026.pdf',
    coverTitle: 'Aluminio premium',
    coverGradient: 'linear-gradient(150deg, #1A2E47, #2C4A6B)'
  },
  {
    slug: 'pvc',
    name: 'PVC',
    systems: '6 SISTEMAS',
    description: 'Aislación térmica y acústica superior. Refuerzos de acero galvanizado.',
    pages: '34 PÁGINAS',
    size: '6.4 MB',
    pdfPath: '/catalogos/bmr-pvc-2026.pdf',
    coverTitle: 'PVC premium',
    coverGradient: 'linear-gradient(150deg, #182E47, #34547A)'
  },
  {
    slug: 'madera',
    name: 'Madera',
    systems: '4 SISTEMAS',
    description: 'Cedro y roble seleccionado. Terminaciones a medida y herrajes premium.',
    pages: '28 PÁGINAS',
    size: '5.1 MB',
    pdfPath: '/catalogos/bmr-madera-2026.pdf',
    coverTitle: 'Madera premium',
    coverGradient: 'linear-gradient(150deg, #1F3858, #2C4A6B)'
  }
];

export const catalogPdfChecklist = [
  'bmr-catalogo-general-2026.pdf',
  'bmr-aluminio-2026.pdf',
  'bmr-pvc-2026.pdf',
  'bmr-madera-2026.pdf'
] as const;
