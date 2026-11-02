// Hostinger Premium static build only.
// The normal vite.config.ts is intentionally left unchanged for Lovable.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // This birthday experience is entirely client-side. It has no server
  // functions or API routes, so it can run as a static SPA on shared hosting.
  tanstackStart: {
    spa: {
      enabled: true,
    },
  },
  // Do not emit a Nitro server: Hostinger Premium serves static files only.
  nitro: false,
});
