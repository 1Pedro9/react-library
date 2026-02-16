// tsup.config.js
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.js'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'css',           // handle plain .css (if any)
      '.module.css': 'css',    // handle CSS Modules
    };
  },
  // Important: tell bundlers this package has side effects (CSS)
  // This helps prevent tree-shaking away the styles
  // You can also use array: ["**/*.module.css"]
  sideEffects: true,
});