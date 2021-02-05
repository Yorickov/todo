const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const paths = require('./paths');
const Common = require('./webpack.common.js');

module.exports = merge(Common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    filename: 'js/[name].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: false, importLoaders: 1 },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: '[id].css'
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  performance: {
    hints: 'error',
    maxEntrypointSize: 10000000,
    maxAssetSize: 10000000,
  },
});
