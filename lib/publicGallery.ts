import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png']);

export function getPublicGalleryPaths(relativePublicDir: string, { exclude = [] as string[] } = {}) {
  const dirPath = path.join(process.cwd(), 'public', relativePublicDir);
  if (!fs.existsSync(dirPath)) return [];

  const excludeSet = new Set(exclude.map((file) => file.toLowerCase()));

  return fs
    .readdirSync(dirPath)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .filter((file) => !excludeSet.has(file.toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'es'))
    .map((file) => `/${relativePublicDir}/${file}`);
}
