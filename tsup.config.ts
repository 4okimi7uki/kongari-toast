import { defineConfig } from "tsup";
import fs from "fs";

const css = fs.readFileSync("./src/toast.css", "utf8");

const injectFunc = `
function injectStyle(css) {
  if (!css || typeof document === 'undefined') return;
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  if (head.firstChild) head.insertBefore(style, head.firstChild);
  else head.appendChild(style);
  if (style.styleSheet) style.styleSheet.cssText = css;
  else style.appendChild(document.createTextNode(css));
}
`;

export default defineConfig({
    entry: ["src/toast.ts"],
    format: ["esm"],
    target: "es2020",
    sourcemap: false,
    clean: true,
    minify: true,
    splitting: false,
    dts: true,
    banner: {
        js: `"use client";\n${injectFunc}\ninjectStyle(${JSON.stringify(css)});`,
    },
});
