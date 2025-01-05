const { build } = require("esbuild");
const { dependencies, peerDependencies } = require('./package.json')
const { Generator } = require('npm-dts');
const { platform } = require("os");
const { format } = require("path");

new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate();

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  format: "iife",
  external: Object.keys(dependencies),
  platform: 'browser',
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: "dist/index.js",
});

build({
  ...sharedConfig,
  outfile: "dist/index.esm.js",
  platform: 'neutral', // for ESM
  format: "esm",
});