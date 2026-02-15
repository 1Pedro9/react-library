const { defineConfig } = require("tsup");

module.exports = defineConfig({
  entry: ["src/index.js"],
  format: ["esm", "cjs"],
  clean: true,
  external: ["react", "react-dom"],
});