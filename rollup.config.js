import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const name = "PrismicRichtext";

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/prismic-richtext.esm.js',
      format: 'esm'
    },
    {
      file: './dist/prismic-richtext.js',
      format: 'umd',
      name
    },
    {
      file: './dist/prismic-richtext.min.js',
      format: 'umd',
      name,
      plugins: [terser()]
    }
  ],
  plugins: [
    nodeResolve({
      extensions: ['.ts']
    }),
    babel({
      extensions: ['.ts'],
      babelHelpers: 'bundled',
      presets: [
        "@babel/typescript",
        ["@babel/env", {
          loose: true,
          // transpile class properties
          shippedProposals: true,
        }],
      ]
    }),
  ]
};
