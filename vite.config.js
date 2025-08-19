import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],
  build: {
    minify: "terser", // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    target: "esnext", // Target modern browsers to avoid unnecessary transpilation
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["styled-components", "framer-motion"],
          icons: ["react-icons/fa"],
          "form-vendor": ["formik"],
        },
      },
    },
  },
});
