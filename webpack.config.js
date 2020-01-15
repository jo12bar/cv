const path = require('path');

module.exports = [{
  entry: './webpack/webpack-styles.scss',
  output: {
    path: path.resolve(__dirname, 'assets/generated/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      }
    ]
  }
}]
