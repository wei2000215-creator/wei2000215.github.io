import {
  defineConfig
} from "vite";
import {
  resolve
} from "path";
import fs from "fs";
import inject from "@rollup/plugin-inject";

const pagesDir = resolve(__dirname, "src/pages");
const pageEntries = Object.fromEntries(
  fs.readdirSync(pagesDir)
    .filter((file) => file.endsWith(".html"))
    .map((file) => [file.replace(".html", ""), resolve(pagesDir, file)])
);

export default defineConfig({
  root: "src/",
  publicDir: "../public/",
  base: "./",
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    modulePreload: false,
    minify: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        ...pageEntries,
      },
      output: {
        entryFileNames: "script/[name].js",
        chunkFileNames: "script/chunks/[name].js",
        assetFileNames: ({
          name
        }) => {
          if (name.endsWith(".css")) {
            return "style/[name].[ext]";
          } else {
            return "assets/[name].[ext]";
          }
        },
      },
    },
  },
  plugins: [
    inject({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
});
