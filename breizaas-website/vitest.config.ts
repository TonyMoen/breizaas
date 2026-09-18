import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    // Absolute path: a relative one is resolved against the parent folder, which breaks the run
    setupFiles: [path.resolve(__dirname, './vitest.setup.ts')],
    // src/sanity/env.ts requires these at import time; tests never reach the network
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: 'testproject',
      NEXT_PUBLIC_SANITY_DATASET: 'production',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
