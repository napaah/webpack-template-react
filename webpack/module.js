module.exports = {
  rules: [
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[hash][ext][query]',
      },
    },
    {
      test: /\.(png|jpe?g|svg|gif)$/,
      type: 'asset',
      generator: {
        filename: 'images/[hash][ext][query]',
      },
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024,
        },
      },
    },
    {
      test: /\.(svg)$/,
      type: 'asset/source',
    },
    {
      test: /\.(js|m?js|jsx|ts|tsx)$/,
      use: [
        {
          loader: 'thread-loader',
          options: {
            workers: 4,
            workerParallelJobs: 50,
            workerNodeArgs: ['--max-old-space-size=8192'],
          },
        },
        {
          loader: 'babel-loader',
        },
      ],
      exclude: /(node_modules)/,
    },
  ]
}