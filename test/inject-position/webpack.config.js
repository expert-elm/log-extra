const htmlPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './index.js',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new htmlPlugin()
  ]
}
