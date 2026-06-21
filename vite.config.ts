import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const chunkMap: Record<string, string[]> = {
  'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
  'vendor-motion':   ['framer-motion'],
  'vendor-charts':   ['recharts'],
  'vendor-forms':    ['react-hook-form', '@hookform/resolvers', 'zod'],
  'vendor-ui':       ['lucide-react', 'clsx', 'tailwind-merge'],
  'vendor-supabase': ['@supabase/supabase-js'],
  'vendor-misc':     ['zustand', 'react-helmet-async', 'date-fns'],
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          for (const [chunk, pkgs] of Object.entries(chunkMap)) {
            if (pkgs.some((pkg) => id.includes(`/node_modules/${pkg}/`))) {
              return chunk
            }
          }
        },
      },
    },
  },
})
