const path = require('path')

const webpackModule = require('./module')
const plugins = require('./plugins')
const resolve = require('./resolve')
const optimization = require('./optimization');

const resolvePath = (url) => {
  return path.resolve(__dirname, url)
}

module.exports = (env) => ({
  entry: resolvePath('../src/index.js'),
  output: {
    path: resolvePath('../dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash:6].js',
    clean: true
  },
  module: webpackModule,
  plugins: plugins(env),
  resolve,
  optimization,
})
