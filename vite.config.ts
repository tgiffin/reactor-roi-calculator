
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["c23df71f-0da9-45e8-bdac-3eca8040b082.lovableproject.com", "localhost"],
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate the distribution as a self-contained library
    lib: mode === 'production' ? {
      entry: path.resolve(__dirname, 'src/embed.tsx'),
      name: 'ReactorCalculator',
      formats: ['iife'],
      fileName: () => 'reactor-calculator.js',
    } : undefined,
    // Ensure external CSS is included
    cssCodeSplit: false,
    // Output to dist folder
    outDir: 'dist',
    // For embedded scripts, we want to inline all assets for simplicity
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        // For WordPress embedding we want a single JS file
        manualChunks: undefined,
        inlineDynamicImports: true,
      }
    }
  },
  // ✅ Fix: Ensure `process.env.NODE_ENV` is defined during build
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
