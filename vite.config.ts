import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    glsl(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'r3f-vendor': ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          'gsap-vendor': ['gsap'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
  },
})
