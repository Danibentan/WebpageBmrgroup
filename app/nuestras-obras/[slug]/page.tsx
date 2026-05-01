import { notFound } from 'next/navigation';

import { ProjectDetail } from '@/components/obras/ProjectDetail';
import { obras } from '@/content/obras';

export default function ObraDetailPage({ params }: { params: { slug: string } }) {
  const obra = obras.find((item) => item.slug === params.slug);
  if (!obra) notFound();

  return <ProjectDetail project={obra} />;
}

export function generateStaticParams() {
  return obras.map((obra) => ({ slug: obra.slug }));
}
