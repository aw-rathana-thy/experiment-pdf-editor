import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactRefresh from "@vitejs/plugin-react-refresh";
import topLevelAwait from "vite-plugin-top-level-await";
// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  // build: { target: "es2020" },
  // optimizeDeps: {
  //   esbuildOptions: { target: "es2020", supported: { bigint: true } },
  // },
  plugins: [
    react(),
    reactRefresh(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
  esbuild: {
    jsxInject: `import React from 'react';`,
  },
});
