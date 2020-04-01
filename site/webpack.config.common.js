const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

const htmlEntryPoints = glob.sync("./public/**/*.html");
const htmlWebpackPlugins = htmlEntryPoints.map(filepath => {
  const filename = filepath.replace("./public/", "");
  const template = path.resolve(__dirname, filepath);
  const options = {
    filename,
    inject: true,
    template
  };
  return new HtmlWebpackPlugin(options);
});

module.exports = {
  entry: "./public/assets/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/[name].[contenthash].js"
  },
  plugins: [new CleanWebpackPlugin(), ...htmlWebpackPlugins],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
