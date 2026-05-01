import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { ObraDetailClient } from '@/components/obras/ObraDetailClient';
import { obras } from '@/content/obras';

export default function ObraDetailPage({ params }: { params: { slug: string } }) {
  const obra = obras.find((item) => item.slug === params.slug);
  if (!obra) notFound();

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pb-16 text-white">
      <ProfessionalHeader />
      <section className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-12 md:px-10 md:pt-16">
        <Link href="/nuestras-obras" className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF6F] hover:text-[#e0be82]">
          ← Volver a Nuestras obras
        </Link>
      </section>

      <ObraDetailClient title={obra.title} description={obra.detailDescription} gallery={obra.gallery} />
    </main>
  );
}

