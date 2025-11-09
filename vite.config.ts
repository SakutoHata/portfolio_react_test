import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio_react_test/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
