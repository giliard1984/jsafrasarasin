/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    globals: true,
    environment: 'jsdom',
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@definitions": path.resolve(__dirname, "./src/definitions"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services")
    },
  },
})
