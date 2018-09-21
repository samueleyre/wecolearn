var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('mini-css-extract-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

process.env.NODE_ENV = process.env.ENV = 'development'; // surchargé par mode: "development"


module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: "development",

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[hash].css'
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
