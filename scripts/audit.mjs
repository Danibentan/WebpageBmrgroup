import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const checks = [
  { label: 'Ruta home Next', file: 'app/page.tsx', critical: true },
  { label: 'Hero Overlay', file: 'components/hero/HeroOverlay.tsx', critical: true },
  { label: 'Slides config', file: 'content/hero-slides.ts', critical: true },
  { label: 'Script sync assets', file: 'scripts/sync-assets.mjs', critical: true },
  { label: 'Asset slide 01', file: 'public/assets/hero/bmr-slide-01.jpg', critical: true },
  { label: 'Asset slide 02', file: 'public/assets/hero/bmr-slide-02.jpg', critical: true },
  { label: 'Asset slide 03', file: 'public/assets/hero/bmr-slide-03.jpg', critical: true },
  { label: 'Asset slide 04', file: 'public/assets/hero/bmr-slide-04.jpg', critical: true },
  { label: 'Logo principal', file: 'public/assets/logos/bmr-icon-blue.svg', critical: true },
  { label: 'Legacy static index', file: 'index.html', critical: false }
];

let hasCriticalFailure = false;

console.log('=== AUDIT BMR ===');
for (const check of checks) {
  const fullPath = path.join(root, check.file);
  const ok = existsSync(fullPath);
  const icon = ok ? '✅' : check.critical ? '❌' : '⚠️';
  console.log(`${icon} ${check.label}: ${check.file}`);
  if (!ok && check.critical) {
    hasCriticalFailure = true;
  }
}

if (hasCriticalFailure) {
  console.log('\nResultado: FALLA (faltan archivos críticos para producción).');
  process.exit(1);
}

console.log('\nResultado: OK (estructura crítica presente).');
