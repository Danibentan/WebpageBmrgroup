'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import type { Obra } from '@/content/obras';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { ObraDetailClient } from './ObraDetailClient';
import { ProjectComingSoon } from './ProjectComingSoon';

type ProjectDetailProps = {
  project: Obra;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hasGallery = project.gallery.length > 0;

  useGSAP(
    () => {
      if (!rootRef.current) return;
      const tl = gsap.timeline();
      tl.from('.project-back-link', { y: 10, opacity: 0, duration: 0.25, ease: 'power2.out' });
      tl.from('.project-intro', { y: 16, opacity: 0, duration: 0.35, stagger: 0.08, ease: 'power2.out' }, '-=0.08');
      tl.from('.project-media', { y: 16, opacity: 0, scale: 0.98, duration: 0.35, ease: 'power2.out' }, '-=0.1');
    },
    { scope: rootRef }
  );

  return (
    <main ref={rootRef} className="min-h-screen bg-[var(--bg-primary)] pb-16 text-white">
      <ProfessionalHeader />
      <section className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-12 md:px-10 md:pt-16">
        <Link href="/nuestras-obras" className="project-back-link inline-flex items-center gap-2 text-sm font-semibold text-[var(--bmr-gold)] hover:text-[#f0cc8f]">
          ← Volver a Nuestras obras
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="project-intro mt-3">
          <h1 className="font-editorial text-4xl text-white md:text-5xl">{project.title}</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--bmr-gold)]">{project.meta}</p>
        </div>

        <div className="project-media mt-6">
          {hasGallery ? (
            <ObraDetailClient title={project.title} description={project.detailDescription} gallery={project.gallery} />
          ) : (
            <div className="pb-16">
              <ProjectComingSoon projectName={project.title} />
              <article className="mt-8 rounded-2xl border border-white/10 bg-[var(--bg-elevated-1)]/40 p-6">
                <h2 className="font-editorial text-3xl text-white md:text-4xl">{project.title}</h2>
                <p className="mt-4 max-w-4xl text-lg text-[var(--bmr-silver)]">{project.detailDescription}</p>
              </article>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
