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
    src: withBase('/assets/hero/BMR_slideshow_profesional_02.jpg'),
    caption: 'Plano detalle de abertura en fachada clara',
    alt: 'Interior con terminaciones premium y ventanales de gran formato.',
    duration: 5000
  },
  {
    id: 'showroom-interior-02',
    type: 'image',
    src: withBase('/assets/hero/BMR_slideshow_profesional_03.jpg'),
    caption: 'Detalle vertical de fachada',
    alt: 'Ambiente residencial con carpintería de alta prestación.',
    duration: 5000
  },
  {
    id: 'showroom-interior-03',
    type: 'image',
    src: withBase('/assets/hero/BMR_slideshow_profesional_04.jpg'),
    caption: 'Vista abierta con carpintería premium',
    alt: 'Vista abierta con ingreso de luz natural a través de aberturas premium.',
    duration: 5000
  },
  {
    id: 'showroom-interior-04',
    type: 'image',
    src: withBase('/assets/hero/BMR_slideshow_profesional_08.jpg'),
    caption: 'Sistema corredizo de gran formato',
    alt: 'Corredizas de gran formato en proyecto residencial contemporáneo.',
    duration: 5000
  }
];
