import buble from 'rollup-plugin-buble'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'

const plugins = [
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: ['@babel/env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-syntax-jsx',
    ],
  }),
  buble({objectAssign: 'Object.assign'}),
  uglify({
    sourcemap: false,
    mangle: true,
    compress: {negate_iife: false, expression: true},
  }),
]

export default [{
  input: 'src/index.js',
  plugins,
  external: ['react'],
  output: {
    file: 'index.js',
    format: 'cjs',
    exports: 'named',
    globals: {react: 'React'},
    strict: false,
    treeshake: {
      pureExternalModules: true,
    }
  }
}, {
  input: 'src/traits.js',
  plugins,
  output: {
    file: 'traits.js',
    format: 'cjs',
    strict: false,
    treeshake: {
      pureExternalModules: true,
    }
  }
}];
