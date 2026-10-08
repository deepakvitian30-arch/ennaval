import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5180,
    strictPort: false,
    open: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
    open: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/motion')) {
            return 'vendor-motion';
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})
