const { merge } = require("webpack-merge")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const path = require('path');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const baseConfig = require('./webpack.base');

module.exports = (env) => {
  return merge(baseConfig(env), {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.s?css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 3,
              },
            },
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(
                    __dirname,
                    '../src/style/var.scss'
                  ),
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[contenthash:9].[name].css',
        ignoreOrder: true,
      }),
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
    ],
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.(jsx|js)$/,
          extractComments: false,
          parallel: true,
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              pure_funcs: ["console.log"]
            }
          },
        }),
        new CssMinimizerPlugin()
      ],
    },
  })
}