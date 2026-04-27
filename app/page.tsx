import ImmersiveHero from '@/components/hero/ImmersiveHero';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-[#e6edf8]">
      <ImmersiveHero />

      <SiteFooter />
    </main>
  );
}
