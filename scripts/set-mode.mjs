import { copyFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const mode = process.argv[2];

if (mode !== 'next' && mode !== 'static') {
  console.error('Usage: node scripts/set-mode.mjs <next|static>');
  process.exit(1);
}

const sourceFile = mode === 'next' ? 'package.next.json' : 'package.static.json';
if (!existsSync(sourceFile)) {
  console.error(`Missing ${sourceFile}`);
  process.exit(1);
}

copyFileSync(sourceFile, 'package.json');
console.log(`Switched package.json to ${mode} mode.`);

const install = spawnSync('npm', ['install'], { stdio: 'inherit', shell: true });
process.exit(install.status ?? 1);
