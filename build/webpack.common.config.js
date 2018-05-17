module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].js",
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