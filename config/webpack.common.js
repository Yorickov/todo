const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${paths.src}/template.html`,
      filename: 'index.html',
      title: 'TODO',
      favicon: `${paths.src}/images/favicon.ico`,
    }),
  ],
};
