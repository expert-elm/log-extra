import path from 'path'
import {
  EnvironmentPlugin,
  ContextReplacementPlugin
} from 'webpack'

const locales = process.env.MOMENT_LOCALS || 'en'

export default {
  mode: process.env.NODE_ENV,
  entry: path.resolve('src/index.js'),
  output: {
    path: path.resolve('.'),
    filename: 'index.js',
    library: 'Logger',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [{
      test: /.js$/,
      use: 'babel-loader'
    }]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: false,
      DEBUG: false
    })
  ],
  externals: [
    'chalk'
  ]
}
