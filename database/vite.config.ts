import heximon from "@heximon/build/vite";
import { defineConfig } from "vite-plus";

// `vp dev` runs this. The heximon() plugin compiles `src/` and serves the generated `fetch` handler; the
// compiler plugins live in `heximon.config.ts` (the single source of truth dev, build, and tests all read).
export default defineConfig({
  plugins: [heximon()],
  server: {
    port: 3000,
  },
});
