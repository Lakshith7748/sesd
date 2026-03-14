import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5177,
    strictPort: true,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
      },
    },
  },
})
