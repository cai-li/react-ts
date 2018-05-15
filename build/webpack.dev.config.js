const webpack = require('webpack');
const config = require('./webpack.common.config');
config.devServer = {
  hot: true,
  port: 1994,
  publicPath: '/dist/',
  historyApiFallback: {
    index: './index.html'
  },
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = config;