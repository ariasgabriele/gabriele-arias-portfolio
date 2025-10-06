import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// imposta la base del repo per GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/gabriele-arias-portfolio/',
})
