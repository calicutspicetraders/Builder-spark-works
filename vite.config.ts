import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Hostinger optimization
  build: {
    target: "es2015",
    minify: "terser",
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ["react", "react-dom"],
          ui: [
            "lucide-react",
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
          ],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
          // Split large components
          admin: [
            "./src/pages/AdminDashboard.tsx",
            "./src/pages/Analytics.tsx",
            "./src/pages/SuperAdminDashboard.tsx",
          ],
          forms: [
            "./src/components/ui/form.tsx",
            "./src/components/ui/input.tsx",
            "./src/components/ui/textarea.tsx",
          ],
        },
        // Optimize chunk naming for better caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Optimize for Hostinger
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ["console.log", "console.debug"],
      },
      mangle: {
        safari10: true,
      },
    },
    // Reduce bundle size
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Development server optimization
  server: {
    host: true,
    port: 3000,
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
  // Preview server (for production testing)
  preview: {
    host: true,
    port: 4173,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "lucide-react",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },
  // Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  // CSS optimization
  css: {
    devSourcemap: false, // Disable source maps for better performance
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  // Experimental features for better performance
  esbuild: {
    target: "es2015",
    legalComments: "none",
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
});
