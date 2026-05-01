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


const slugAliases: Record<string, string> = {
  'oficina-corporativa': 'oficina-corporativa',
  'oficinas-corporativas': 'oficina-corporativa',
  'oficinas-costanera': 'oficina-corporativa',
  'oficina-corporativa-bmr': 'oficina-corporativa',
  'oficina-corporativa-tigre': 'oficina-corporativa'
};

export default function ObraDetailPage({ params }: { params: { slug: string } }) {
  const requested = normalize(params.slug);
  const resolvedSlug = slugAliases[requested] ?? requested;
  const obra = obras.find((item) => item.slug === resolvedSlug || normalize(item.title) === resolvedSlug);
  if (!obra) notFound();

  return <ProjectDetail project={obra} />;
}

