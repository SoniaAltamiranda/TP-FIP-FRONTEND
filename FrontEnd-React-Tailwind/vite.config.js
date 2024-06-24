import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // build:{
  //   outDir: 'build'
  // },
  plugins: [react()],
  server: {
    cors:
  {
    origin: 'https://alquilafacil-5e48c.web.app/',
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
  }
})
