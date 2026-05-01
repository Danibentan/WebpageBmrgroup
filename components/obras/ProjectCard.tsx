'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  category: 'RESIDENCIAL' | 'CORPORATIVO';
  location: string;
  meta: string;
  image: string;
};

const FALLBACK_IMAGE = '/products/bmr-product-placeholder.svg';

export function ProjectCard({ slug, title, description, category, location, meta, image }: ProjectCardProps) {
  const [currentImage, setCurrentImage] = useState(image);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--bmr-gold)]/25 bg-[color:var(--bg-elevated-1)]/72 transition-all duration-200 ease-in hover:-translate-y-1 hover:border-[var(--bmr-gold)]/55">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={currentImage}
          alt={title}
          width={1200}
          height={750}
          className="h-full w-full object-cover"
          onError={() => setCurrentImage(FALLBACK_IMAGE)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated-2)]/80 via-[var(--bg-elevated-2)]/25 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full border border-[var(--bmr-gold)]/50 bg-[var(--bg-elevated-2)]/70 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[var(--bmr-gold)]">
          {category}
        </span>
      </div>

      <div className="space-y-3 p-6">
        <h2 className="font-editorial text-3xl text-white">{title}</h2>

        <p className="flex items-center gap-2 text-sm text-[var(--bmr-gold)]">
          <MapPin size={14} />
          <span>{location}</span>
        </p>

        <p className="text-[var(--bmr-silver)]">{description}</p>

        <p className="text-sm text-white/60">{meta}</p>

        <Link href={`/nuestras-obras/${slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--bmr-gold)] transition-colors hover:text-[#f0cc8f]">
          Ver proyecto
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
