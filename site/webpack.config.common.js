const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

const htmlEntryPoints = glob.sync("./build/11ty/**/*.html");
const htmlWebpackPlugins = htmlEntryPoints.map(filepath => {
  const filename = filepath.replace("./build/11ty/", "");
  const template = path.resolve(__dirname, filepath);
  const options = {
    filename,
    inject: true,
    template
  };
  return new HtmlWebpackPlugin(options);
});

module.exports = {
  entry: "./src/assets/pack.js",
  output: {
    path: path.resolve(__dirname, "build/dist"),
    publicPath: "/"
  },
  plugins: [
    new CopyPlugin([{ context: "src", from: "images/**" }]),
    ...htmlWebpackPlugins
  ],
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
