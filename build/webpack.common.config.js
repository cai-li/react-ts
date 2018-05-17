module.exports = {
  entry: {
    app:["./src/index.tsx"]
  },
  output: {
    filename: "[name].js", // 输出 bundle 的名称,会被写入到path指定的目录下
    path: __dirname + "/dist",
    publicPath:"/dist/",
    chunkFilename: "[name].[chunkhash:5].chunk.js"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
  ],
};