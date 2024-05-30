import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/* for proxy and networking */
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/' : 'http://localhost:5000',
    }
  }
})
