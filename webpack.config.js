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
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              '...',
              {
                tag: 'a-asset-item',
                attribute: 'src',
                type: 'src',
              }
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|mp3|wav|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(glb|gltf)$/i,
        type: 'asset/resource',
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
