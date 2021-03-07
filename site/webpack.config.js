const glob = require("glob");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const entries = glob.sync(
  path.resolve(__dirname, "src/assets/images/articles/*.{png,gif,jpg,jpeg}")
);
entries.push(path.resolve(__dirname, "src/assets/styles/main.css"));
entries.push(path.resolve(__dirname, "src/assets/pack.js"));

// TODO: Remove if the blog does not need syntax highlight
entries.push(path.resolve(__dirname, "src/assets/styles/prism-atom-dark.css"));

let cssFileName = "styles/[name].css";

if (process.env.NODE_ENV === "production") {
  cssFileName = "styles/[name].[contenthash].css";
}

module.exports = {
  mode: "development",
  entry: entries,
  output: {
    path: path.resolve(__dirname, "_site/assets"),
    publicPath: "/",
  },
  optimization: {
    moduleIds: "deterministic",
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "_site"),
        },
      ],
    }),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: cssFileName,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "webpack.html"),
      filename: path.resolve(__dirname, "src/_includes/layouts/webpack.ejs"),
      inject: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/articles/[name].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: true,
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
