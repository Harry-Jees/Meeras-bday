import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Relative paths let the completed `dist/index.html` work when opened directly.
export default defineConfig({ base: './', plugins: [react()] });
