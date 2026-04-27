'use client';

import Image from 'next/image';

import type { HeroSlide } from '@/types/hero';

type HeroMediaProps = {
  slide: HeroSlide;
  index: number;
  activeIndex: number;
};

export function HeroMedia({ slide, index, activeIndex }: HeroMediaProps) {
  const isActive = index === activeIndex;
  const imageSrc = slide.type === 'video' ? (slide.poster ?? slide.src) : slide.src;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
      aria-label={slide.alt}
    >
      <Image
        src={imageSrc}
        alt={slide.alt}
        fill
        sizes="100vw"
        quality={85}
        priority={index === 0}
        loading={index === 0 ? 'eager' : 'lazy'}
        className={`object-cover will-change-transform transition-transform duration-[8000ms] ease-linear ${isActive ? 'scale-[1.05]' : 'scale-100'}`}
      />
    </div>
  );
}
