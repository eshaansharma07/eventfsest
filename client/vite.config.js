import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-router-dom'],
          motionVendor: ['framer-motion'],
          chartsVendor: ['recharts'],
          calendarVendor: ['react-big-calendar', 'moment'],
          uiVendor: ['lucide-react', 'react-hot-toast', 'axios', 'jspdf']
        }
      }
    }
  }
});
