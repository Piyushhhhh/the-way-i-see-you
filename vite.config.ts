import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/a-little-place-for-you/',
  plugins: [tailwindcss(), react()],
  build: {
    target: 'es2020',
  },
})
