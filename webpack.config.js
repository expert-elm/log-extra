import path from 'path'

export default [{
  mode: process.env.NODE_ENV,
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
  entry: path.resolve('src/socket.js'),
  node: false,
  output: {
    path: path.resolve('.'),
    filename: 'socket.js',
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
    'isomorphic-ws',
    './'
  ]
}]
