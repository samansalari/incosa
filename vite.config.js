import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        observatory: path.resolve(__dirname, "observatory.html"),
        expedition: path.resolve(__dirname, "expedition.html"),
        traces: path.resolve(__dirname, "traces.html"),
        contact: path.resolve(__dirname, "contact.html"),
      },
    },
    assetsInclude: [
      "**/*.jpeg",
      "**/*.jpg",
      "**/*.png",
      "**/*.svg",
      "**/*.gif",
    ],
    copyPublicDir: true,
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['incosa.world', '.railway.app']
  }
});
