import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// same port and output folder as the old Create React App setup
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  preview: { port: 3000 },
  build: { outDir: 'build' },
})
