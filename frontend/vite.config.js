import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['react-icons'],
    },
  },
  // server: {
  //   allowedHosts: [
  //     'hormone-outlets-whats-mambo.trycloudflare.com'
  //   ]
  // },
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8080', // backend chạy local
  //     changeOrigin: true,
  //     secure: false,
  //   },
  // },
});
