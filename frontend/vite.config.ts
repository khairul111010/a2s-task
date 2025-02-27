import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:1234',
        changeOrigin: true,
      },
    },
  },
})
