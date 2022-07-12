const path = require('path');

module.exports = {
  extensions: ['.js', '.jsx', '.scss', '.css'],
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
};
