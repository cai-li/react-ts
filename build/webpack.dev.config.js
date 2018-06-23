const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.common.config');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

config.devServer = {
  hot: true,
  port: 1995,
  contentBase: resolve('../src'),
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = config;