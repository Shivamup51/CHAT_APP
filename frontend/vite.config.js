import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.BASE_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
