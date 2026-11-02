// @lovable.dev/vite-tanstack-config already supplies the application plugins.
// Keep this wrapper to preserve Lovable's editor/preview integration.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Emit a fully static site for Hostinger Premium shared hosting.
  // TanStack Start prerenders the public route at build time; Nitro's
  // static preset publishes only the generated public files.
  nitro: {
    preset: "static",
  },
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: false,
      failOnError: true,
    },
  },
});
