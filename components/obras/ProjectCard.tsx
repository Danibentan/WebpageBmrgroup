'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

type ProjectCardProps = {
  title: string;
  description: string;
  category: 'RESIDENCIAL' | 'CORPORATIVO';
  location: string;
  meta: string;
  image: string;
};

const FALLBACK_IMAGE = '/products/bmr-product-placeholder.svg';

export function ProjectCard({ title, description, category, location, meta, image }: ProjectCardProps) {
  const [currentImage, setCurrentImage] = useState(image);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#D4AF6F]/25 bg-[color:var(--bg-elevated-1)]/72 transition-all duration-200 ease-in hover:-translate-y-1 hover:border-[#D4AF6F]/55">
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
        <span className="absolute bottom-4 left-4 rounded-full border border-[#D4AF6F]/50 bg-[var(--bg-elevated-2)]/70 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-[#D4AF6F]">
          {category}
        </span>
      </div>

      <div className="space-y-3 p-6">
        <h2 className="font-editorial text-3xl text-white">{title}</h2>

        <p className="flex items-center gap-2 text-sm text-[#D4AF6F]">
          <MapPin size={14} />
          <span>{location}</span>
        </p>

        <p className="text-[#d2e0f2]">{description}</p>

        <p className="text-sm text-white/60">{meta}</p>

        <Link href="/contacto" className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF6F] transition-colors hover:text-[#e0be82]">
          Ver proyecto
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
