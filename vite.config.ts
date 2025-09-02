import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Custom wrapper plugin to load lovable-tagger dynamically
function lovableTaggerPlugin(): Plugin {
  return {
    name: "lovable-tagger-plugin",
    async configResolved() {
      if (process.env.NODE_ENV === "development") {
        const { componentTagger } = await import("lovable-tagger");
        componentTagger();
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    lovableTaggerPlugin(), // Dynamic ESM-safe plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ["lovable-tagger"], // Prevent ESM-only loading issues
  },
});
