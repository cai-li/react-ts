const webpack = require('webpack')
var fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')//css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

// const themeVariables = lessToJs(fs.readFileSync('./ant-theme-vars.less'), 'utf8')

const isLocal = process.env.NODE_ENV === 'local'
const isDevelop = process.env.NODE_ENV === 'develop'

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const pkgPath = resolve('../package.json')
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {}
let theme = {}
if (pkg.theme && typeof pkg.theme === 'string') {
  let cfgPath = pkg.theme
  // relative path
  if (cfgPath.charAt(0) === '.') {
    cfgPath = resolve(cfgPath)
  }
  const getThemeConfig = require(cfgPath)
  theme = getThemeConfig()
} else if (pkg.theme && typeof pkg.theme === 'object') {
  theme = pkg.theme
}

module.exports = {
  entry: {
    app: resolve('../src/index.tsx'),
  },
  output: {
    filename: 'js/[name].js', // 输出 bundle 的名称,会被写入到path指定的目录下
    path: resolve('../dist'),
    chunkFilename: 'js/[name].[chunkhash:5].chunk.js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      styles: resolve('../src/styles')
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({ libraryName: "antd", style: true })]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: resolve('../node_modules'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'less-loader', options: { sourceMap: true } },
          ]
        }),
      },
      {
        test: /\.less$/,
        include: resolve('../node_modules'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                modules: false,
                modifyVars: theme,
              }
            },
          ]
        }),
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: '10000',
          name: './assets/[name].[ext]',
        },
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true,
      disable: !isLocal,
    }),
    //将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('../src/index.html'),
      inject: 'body',
      favicon: resolve('../src/asset/favicon.ico') // 容易被缓存干扰
    }),
  ],
};