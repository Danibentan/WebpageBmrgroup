import { notFound } from 'next/navigation';

import { ProjectDetail } from '@/components/obras/ProjectDetail';
import { obras } from '@/content/obras';

const normalize = (value: string) =>
  decodeURIComponent(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function ObraDetailPage({ params }: { params: { slug: string } }) {
  const requested = normalize(params.slug);
  const obra = obras.find((item) => item.slug === requested || normalize(item.title) === requested);
  if (!obra) notFound();

  return <ProjectDetail project={obra} />;
}

export function generateStaticParams() {
  return obras.map((obra) => ({ slug: obra.slug }));
}
