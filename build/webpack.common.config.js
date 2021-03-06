const webpack = require('webpack')
var fs = require('fs')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')//css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin') // 依赖ts-loader

const isLocal = process.env.NODE_ENV === 'local'
const isDevelop = process.env.NODE_ENV === 'develop'
const isProduction = process.env.NODE_ENV === 'production'

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const path_style = resolve('../src/styles')
const pkgPath = resolve('../package.json')

// 对antd自定义样式的处理
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

var config = {
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
    modules: [
      './src',
      'node_modules',
    ], // 可以直接引用src与node_modules下的目录
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
          }), // antd按需引入使用ts-import-plugin
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
            { loader: 'less-loader', options: { sourceMap: true, includePaths: [path_style] } },
          ]
        }),
      },// 项目css样式的load
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
                modules: false,
                modifyVars: theme,
              }
            },
          ]
        }),
      },// antd的css样式的load
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
    // css单独打包，好处是生产环境下异步加载样式避免出现样式加载不上的情况
    // disable：开发环境下禁用，方便开发调试（否则每次更改样式要刷新页面）
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true,
      disable: isLocal, // 
    }),
    //将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('../src/index.html'),
      inject: 'body',
      favicon: resolve('../src/asset/favicon.ico') // 容易被缓存干扰
    }),
    new webpack.DefinePlugin({
      DEBUG: true
    }),
  ],
};

if(isProduction){
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {NODE_ENV: '"production"'},
    DEBUG: false
  }));
}

module.exports = config