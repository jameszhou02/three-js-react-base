import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any path aliases if needed
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    open: true,
  },
});
