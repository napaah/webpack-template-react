const { merge } = require('webpack-merge')
const path = require('path')

const baseConfig = require('./webpack.base')

module.exports = async (env) => {
  return merge(baseConfig(env), {
    devtool: 'eval-source-map',
    devServer: {
      static: 'dist',
      port: '8000',
      open: true,
      hot: true,
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [path.resolve(__dirname, '../src/style/var.scss')],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // new webpack.DllReferencePlugin({
      //   context: __dirname,
      //   manifest: require('../dist/vendors-manifest.json')
      // }),
    ],
  })
}
