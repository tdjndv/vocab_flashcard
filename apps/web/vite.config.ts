import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// Use env override when running inside Docker
const apiTarget = process.env.VITE_PROXY_TARGET || "http://localhost:3000"

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    postcss: path.resolve(__dirname, "postcss.config.js"),
  },
})