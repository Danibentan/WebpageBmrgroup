import type { HeroSlide } from '@/types/hero';

const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? '';

// Ejemplos para producción:
// const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? 'https://<store>.public.blob.vercel-storage.com';
// const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? 'https://res.cloudinary.com/<cloud_name>/video/upload';

const withBase = (path: string): string => `${mediaBaseUrl}${path}`;

export const heroContent = {
  title: 'Aberturas premium para tu proyecto',
  subtitle:
    'Estética limpia, precisión técnica y ejecución profesional para residencias y espacios corporativos.',
  ctaLabel: 'Solicitar asesoramiento',
  ctaHref: '/contacto'
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'showroom-interior-negro',
    type: 'image',
    src: withBase('/assets/hero/bmr-slide-01.jpg'),
    caption: 'Interior con paños modulares negros',
    alt: 'Interior con cerramiento de hierro y vidrio negro.',
    duration: 6000
  },
  {
    id: 'vista-laguna',
    type: 'image',
    src: withBase('/assets/hero/bmr-slide-02.jpg'),
    caption: 'Vista abierta con carpintería premium',
    alt: 'Vista exterior a laguna a través de abertura.',
    duration: 6000
  },
  {
    id: 'fachada-detalle-vertical',
    type: 'image',
    src: withBase('/assets/hero/bmr-slide-03.jpg'),
    caption: 'Detalle vertical de fachada',
    alt: 'Plano detalle de abertura en fachada clara.',
    duration: 6000
  },
  {
    id: 'fachada-principal',
    type: 'image',
    src: withBase('/assets/hero/bmr-slide-04.jpg'),
    caption: 'Fachada principal con correderas',
    alt: 'Fachada residencial con correderas de gran formato.',
    duration: 6000
  }
];
