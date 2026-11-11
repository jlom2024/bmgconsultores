/**
 * vite.config.node.ts — Build alternativo para VPS Node.js (Hostinger)
 *
 * Usa el preset nitro "node-server" en lugar del Cloudflare Worker default.
 * Genera:  dist-node/server/index.mjs  (HTTP server nativo)
 *          dist-node/client/            (assets estáticos)
 *
 * Uso:  bun run build:node
 */
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import {
  higgsfieldDesignInspectorVitePlugin,
  higgsfieldDesignSourceBabelPlugin,
} from "./src/module/design-inspector/vite";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

const QUANTA_ICONS_SHIM = fileURLToPath(
  new URL("./src/lib/quanta-material-icons.ts", import.meta.url),
);

export default defineConfig(() => {
  return {
    resolve: {
      alias: [
        { find: /^@higgsfield-ai\/icons(\\/.*)?$/, replacement: QUANTA_ICONS_SHIM },
        // En builds Node.js redirigir bindings CF a la implementación SQLite
        {
          find: /^\.\/bindings\.server$/,
          replacement: fileURLToPath(new URL("./src/lib/bindings.node.server.ts", import.meta.url)),
        },
        {
          find: /^.*\/bindings\.server$/,
          replacement: fileURLToPath(new URL("./src/lib/bindings.node.server.ts", import.meta.url)),
        },
      ],
    },
    ssr: {
      // Para Node.js NO bundleamos todo — dejamos node_modules como externals
      noExternal: false,
      // Excluir módulos que NO se pueden bundlear en node
      external: ["cloudflare:workers", "better-sqlite3"],
    },
    build: {
      outDir: "dist-node",
      rollupOptions: {
        external: [/^cloudflare:/, "better-sqlite3"],
      },
    },
    plugins: [
      svgr({
        svgrOptions: {
          icon: true,
          svgProps: { fill: "currentColor" },
          svgoConfig: {
            plugins: [
              { name: "preset-default", params: { overrides: { removeViewBox: false } } },
            ],
          },
        },
      }),
      tanstackStart({
        server: {
          // Preset node-server de Nitro — genera un servidor HTTP standalone
          preset: "node-server",
          entry: "server",
        },
      }),
      higgsfieldDesignInspectorVitePlugin(false),
      react({ babel: { plugins: [] } }),
      tailwindcss(),
      tsconfigPaths(),
    ],
  };
});
