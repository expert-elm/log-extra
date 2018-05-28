import path from 'path'
import {
  EnvironmentPlugin,
  ContextReplacementPlugin
} from 'webpack'

const locales = process.env.MOMENT_LOCALS || 'en'

export default ['terminal', 'browser'].map(env => {
  const { target } = mapEnvToOptions(env)
  return {
    mode: process.env.NODE_ENV,
    target,
    entry: path.resolve('src/index.js'),
    output: {
      path: path.resolve('lib'),
      filename: `${env}.js`,
      library: 'Logger',
      libraryTarget: 'umd'
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
        DEBUG: false,
        LOGGER_ENV: env
      }),
      new ContextReplacementPlugin(
          /moment[\/\\]locale$/,
        new RegExp(locales.split(',').join('|'))
      )
    ],
    externals: [
      'chalk',
      'moment'
    ]
  }
})

function mapEnvToOptions(env) {
  switch(env) {
    case 'terminal':
      return {
        target: 'node'
      }

    case 'browser':
      return {
        target: 'web'
      }
    default:
      throw new Error(`unknow env`)
  }
}
