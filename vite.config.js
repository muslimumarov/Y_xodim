import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      hooks: "/src/hooks",
      layouts: "/src/layouts",
      pages: "/src/pages",
      routs: "/src/routs",
      service: "/src/service",
      stores: "/src/stores",
      styles: "/src/styles",
      utils: "/src/utils",
      socket: "/src/socket",
      eImzo: "/src/eImzo",
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
