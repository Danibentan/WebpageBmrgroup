import { spawnSync } from 'node:child_process';

const command = process.argv[2];

if (!command) {
  console.error('Missing command. Use: build | start | dev');
  process.exit(1);
}

const check = spawnSync('node', ['-e', "require.resolve('next/package.json')"], { stdio: 'ignore' });

if (check.status !== 0) {
  console.error('Next mode is not installed in this environment.');
  console.error('Run: npm run mode:next');
  process.exit(1);
}

const child = spawnSync('npx', ['next', command], { stdio: 'inherit', shell: true });
process.exit(child.status ?? 1);
