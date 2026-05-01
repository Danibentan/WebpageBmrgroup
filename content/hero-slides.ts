import type { HeroSlide } from '@/types/hero';

const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? '';

const withBase = (path: string): string => `${mediaBaseUrl}${path}`;

export const heroContent = {
  title: '',
  subtitle:
    '',
  ctaLabel: '',
  ctaHref: ''
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'showroom-interior-01',
    type: 'image',
    src: withBase('/assets/hero/fachada-la-serena-1.jpg'),
    caption: 'FRENTE CON ABERTURA PREMIUN',
    alt: 'Aberturas premium en fachada residencial clara',
    duration: 5000
  },
  {
    id: 'showroom-interior-02',
    type: 'image',
    src: withBase('/assets/hero/galeria-la-serena.jpg'),
    caption: 'DETALLE GALERIA DE FACHADA',
    alt: 'Detalle galeria de carpintería de aluminio en fachada',
    duration: 5000
  },
  {
    id: 'showroom-interior-03',
    type: 'image',
    src: withBase('/assets/hero/baño-la-serena.jpg'),
    caption: 'MAMPARA DE BAÑO PREMIUN',
    alt: 'Aberturas corredizas de gran formato en proyecto residencial',
    duration: 5000
  }
];
