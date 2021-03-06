import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const plugins = [
  external(),
  babel({
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          exclude: [
            '@babel/plugin-transform-async-to-generator',
            '@babel/plugin-transform-regenerator'
          ]
        }
      ],
      '@babel/react'
    ],
    plugins: ['@babel/plugin-proposal-class-properties']
  }),
  resolve(),
  commonjs({
    include: 'node_modules/**',
    // left-hand side can be an absolute path, a path
    // relative to the current directory, or the name
    // of a module in node_modules
    namedExports: {
      'node_modules/react/index.js': [
        'cloneElement',
        'createContext',
        'Component',
        'isValidElementType',
        'isValidElement',
        'createElement',
        'Children'
      ],
      'node_modules/react-dom/index.js': ['render', 'hydrate'],
      'node_modules/react-is/index.js': [
        'isElement',
        'isFragment',
        'isValidElementType',
        'ForwardRef'
      ]
    }
  })
]

export default [
  {
    input: './index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    plugins
  },
  {
    input: './index.js',
    output: [
      {
        file: pkg['umd:main'],
        name: pkg['umd:main'],
        format: 'umd',
        globals: {
          'lodash/set': '_.set',
          'lodash/get': '_.get',
          react: 'React'
        }
      }
    ],
    plugins: [...plugins, terser()]
  }
]
