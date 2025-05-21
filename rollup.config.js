import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import fs from "fs";
import path from "path";

const inputDir = "src";
const inputFiles = fs
    .readdirSync(inputDir)
    .filter((f) => f.endsWith(".ts"))
    .reduce((entries, file) => {
        const name = path.parse(file).name;
        entries[name] = path.join(inputDir, file);
        return entries;
    }, {});

export default {
    input: inputFiles,
    output: {
        dir: "dist",
        format: "esm",
        entryFileNames: "[name].js",
    },
    plugins: [typescript({ declaration: false }), css({ output: "toast.css" })],
};
