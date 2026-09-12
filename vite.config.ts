import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/the-way-i-see-you/' : '/',
  plugins: [tailwindcss(), react()],
  build: {
    target: 'es2020',
  },
})
