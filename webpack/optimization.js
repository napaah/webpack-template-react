module.exports = {
  usedExports: true,
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      // 配置提取模块的方案
      default: false,
      styles: {
        name: 'styles',
        test: /\.(s?css|less|sass)$/,
        enforce: true,
        priority: 10,
      },
      common: {
        name: 'chunk-common',
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0,
        priority: 1,
        reuseExistingChunk: true,
      },
      vendors: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: 2,
        enforce: true,
        reuseExistingChunk: true,
      },

      react: {
        name: 'react',
        priority: 14,
        test: /[\\/]node_modules[\\/]react/,
        reuseExistingChunk: true,
      },
    },
  },
};
