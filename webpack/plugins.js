const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');

const { getEnv } = require('../lib/env');
const API = getEnv();

module.exports = () => ([
  new HtmlWebpackPlugin({
    title: 'react-template',
    filename: `index.html`,
    template: path.resolve(
      __dirname,
      `../template/index.html`
    ),
    // chunks: chunksArr,
    chunksSortMode: 'manual',
    hash: true,
    inject: 'body',
    templateParameters: {
      isLocal: process.env.isLocal === 'true',
    },
  }),
  new webpack.DefinePlugin({
    ...API,
  }),
  new WebpackBar()
])
