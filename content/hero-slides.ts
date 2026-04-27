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
    id: 'panoramica-exterior',
    type: 'image',
    src: withBase('/assets/BMR_slideshow_profesional_03.jpg'),
    caption: 'Vista panorámica al exterior',
    alt: 'Living moderno con ventanales de aluminio y vista abierta al jardín.',
    duration: 6000
  },
  {
    id: 'showroom-video',
    type: 'video',
    src: withBase('/videos/showroom-hero.mp4'),
    poster: withBase('/assets/BMR_slideshow_profesional_05.jpg'),
    caption: 'Recorrido de showroom premium',
    alt: 'Detalle de showroom con aberturas premium en uso real.',
    videoSources: {
      webm: withBase('/videos/showroom-hero.webm'),
      mp4: withBase('/videos/showroom-hero.mp4')
    }
  },
  {
    id: 'terminaciones-premium',
    type: 'image',
    src: withBase('/assets/BMR_slideshow_profesional_07.jpg'),
    caption: 'Terminaciones de alta prestación',
    alt: 'Primer plano de perfilería minimalista con terminación premium.',
    duration: 6000
  },
  {
    id: 'carpinteria-tecnica',
    type: 'image',
    src: withBase('/assets/BMR_slideshow_profesional_05.jpg'),
    caption: 'Carpintería técnica para proyectos exigentes',
    alt: 'Fachada contemporánea con grandes paños vidriados.',
    duration: 6000
  }
];
