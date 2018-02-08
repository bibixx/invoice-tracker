/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */
const webpack = require("webpack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const cssLoaders = require("./css-loaders");
const common = require("./common");

const { config, iP } = common;

const path = require("path");

module.exports = {
  entry: {
    ...config.entry,
    vendor: [
      ...config.entry.vendor,
      "webpack/hot/only-dev-server",
      // "webpack-dev-server/client?http://192.168.92.212:8080",
      "webpack-dev-server/client?http://localhost:8080",
    ],
  },

  output: config.output,
  // resolve: config.resolve,

  resolve: {
    modules: [
      path.resolve("./src"),
      path.resolve("./node_modules"),
    ],
  },

  devServer: {
    hot: true,
    overlay: true,
    quiet: true,
    historyApiFallback: true,
    contentBase: `${__dirname}/../static`,
  },

  devtool: "#cheap-module-eval-source-map",

  module: {
    rules: [...config.rules, {
      test: /\.css$/,
      use: [{
        loader: "style-loader",
        options: {
          sourceMap: true,
        },
      }].concat(cssLoaders(iP)),
    }],
  },

  plugins: [
    ...config.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ],
};