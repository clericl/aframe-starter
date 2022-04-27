const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // Page-specific JS
    index: './src/index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        }
      },
      {
        test: /\.(jpe?g|png|mp3|wav|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash:7]',
              context: 'src',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    // Clean dist/ on each build
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
    // Add HtmlWebpackPlugin entries to build individual HTML pages
    new HtmlWebpackPlugin({
      // Input path
      template: 'index.html',
      // Output (within dist/)
      filename: 'index.html',
      // Inject compiled JS into <head> (as per A-Frame docs)
      inject: 'head',
    }),
  ],
  // Settings for webpack-dev-server
  devServer: {
    https: true,
    open: true,
  },
};
