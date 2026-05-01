import type { HeroSlide } from '@/types/hero';

const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? '';

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
    id: 'showroom-interior-01',
    type: 'image',
    src: withBase('/assets/hero/fachada-la-serena-1.jpg'),
    caption: 'PLANO DETALLE DE ABERTURA EN FACHADA CLARA',
    alt: 'Aberturas premium en fachada residencial clara',
    duration: 5000
  },
  {
    id: 'showroom-interior-02',
    type: 'image',
    src: withBase('/assets/hero/bano-la-serena.jpg'),
    caption: 'DETALLE VERTICAL DE FACHADA',
    alt: 'Detalle vertical de carpintería de aluminio en fachada',
    duration: 5000
  },
  {
    id: 'showroom-interior-03',
    type: 'image',
    src: withBase('/assets/hero/galeria-la-serena.jpg'),
    caption: 'CORREDIZAS DE GRAN FORMATO EN PROYECTO RESIDENCIAL CONTEMPORÁNEO',
    alt: 'Aberturas corredizas de gran formato en proyecto residencial',
    duration: 5000
  }
];
