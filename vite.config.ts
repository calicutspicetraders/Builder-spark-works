import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Hostinger static hosting optimization
  base: "./", // Use relative paths for static hosting
  build: {
    target: "es2015",
    minify: true,
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Disable source maps for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@radix-ui/react-alert-dialog", "@radix-ui/react-avatar"],
          charts: ["recharts"],
          icons: ["lucide-react"],
        },
        // Optimize file names for web hosting
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
