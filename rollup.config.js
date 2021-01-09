import buble from '@rollup/plugin-buble'
import {terser} from 'rollup-plugin-terser'
import pack from './package.json'

const external = [...Object.keys(pack.peerDependencies), 'react-dom/server']

const plugins = [
  buble({
    objectAssign: true,
    transforms: {
      asyncAwait: false,
      spreadRest: false,
      generator: false,
      dangerousForOf: true,
    },
  }),
  terser(),
]

export default [{
  input: 'src/index.js',
  plugins,
  external,
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    unknownGlobalSideEffects: false,
  },
  output: [{
    file: 'entry-esm.js',
    format: 'es',
    exports: 'named',
    sourcemap: false,
    strict: false,
    globals: {react: 'React'},
  },
  {
    file: 'entry-cjs.js',
    format: 'cjs',
    exports: 'named',
    sourcemap: false,
    strict: false,
    globals: {react: 'React'},
  }]
}];
