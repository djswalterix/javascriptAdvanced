const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.js", // Il tuo file JavaScript principale
  output: {
    path: path.resolve(__dirname, "dist"), // Cartella di output
    filename: "bundle.js", // Nome del file di output
  },
  module: {
    rules: [
      // Regole per trasformare diversi tipi di file
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader", // Ad esempio, per transpilare il codice JavaScript
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
