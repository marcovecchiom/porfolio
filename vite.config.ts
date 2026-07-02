import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite.
// `base: '/'` es correcto para Vercel/Netlify (sirven desde la raíz del dominio).
// Si en el futuro se publicara en GitHub Pages bajo /porfolio/, cambiar a '/porfolio/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
