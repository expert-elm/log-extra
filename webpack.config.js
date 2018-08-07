import path from 'path'

export default [{
  mode: process.env.NODE_ENV,
  target: 'web',
  node: false,
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
  optimization: {
    minimize: false
  },
  plugins: [

  ],
  externals: [
    'chalk'
  ]
},{
  mode: process.env.NODE_ENV,
  entry: path.resolve('src/browser-socket.js'),
  target: 'web',
  node: false,
  output: {
    path: path.resolve('.'),
    filename: 'browser-socket.js',
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
  optimization: {
    minimize: false
  },
  plugins: [

  ],
  externals: [
    'chalk',
    './'
  ]
}]
