const path = require("path");
/* const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 */
const webpackConfig = {
  mode: "development",
  entry: {
    bundle: path.join(__dirname, "src", "index.js"),
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "assets/js"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      /* {
        test: /.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "wp-content/themes/jclabs-react-theme/dist/img/[name].[ext]",
          },
        },
      }, */
    ],
  },
};

module.exports = webpackConfig;
