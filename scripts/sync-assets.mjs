import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const pairs = [
  { from: path.join(root, 'assets', 'hero'), to: path.join(root, 'public', 'assets', 'hero') },
  { from: path.join(root, 'assets', 'logos'), to: path.join(root, 'public', 'assets', 'logos') }
];

for (const { from, to } of pairs) {
  if (!existsSync(from)) {
    continue;
  }

  mkdirSync(to, { recursive: true });
  const files = readdirSync(from);
  if (files.length === 0) {
    continue;
  }

  cpSync(from, to, { recursive: true, force: true });
  console.log(`Synced ${from} -> ${to}`);
}
