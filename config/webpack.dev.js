const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Common = require('./webpack.common.js');
const paths = require('./paths');

module.exports = merge(Common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    // open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
