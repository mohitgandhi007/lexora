import { spawn } from 'child_process';
import path from 'path';

console.log('====================================================');
console.log('??  LAUNCHING LEXORA CHAMBERS FULL STACK WORKSPACE');
console.log('====================================================');

// 1. Launch API (Port 8787)
const apiProcess = spawn('node', ['dist/index.js'], {
  cwd: path.resolve('apps/api'),
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: '8787' }
});

apiProcess.on('error', (err) => {
  console.error('? API Gateway failed to start:', err);
});

// 2. Launch Vite Web Dev Server (Port 3000, cwd: apps/web)
const webProcess = spawn('npx', ['vite', '--port', '3000', '--host'], {
  cwd: path.resolve('apps/web'),
  stdio: 'inherit',
  shell: true,
  env: process.env
});

webProcess.on('error', (err) => {
  console.error('? Web client failed to start:', err);
});

const shutdown = () => {
  try { apiProcess.kill(); } catch (_) {}
  try { webProcess.kill(); } catch (_) {}
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
