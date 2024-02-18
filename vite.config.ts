import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: `./.env.${process.env.NODE_ENV || 'development'}` });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@assets': `${path.resolve(__dirname, './src/assets/')}`,
      '@styles': `${path.resolve(__dirname, './src/styles/')}`,
      '@env': `${path.resolve(__dirname, './src/env/')}`,
    },
  },
  define: {
    'process.env': process.env
  }
});
