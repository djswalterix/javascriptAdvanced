const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Importa HtmlWebpackPlugin

module.exports = {
  mode: "development",
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
        use: ["style-loader", "css-loader"], // Caricamento di file CSS
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html", // Imposta il percorso corretto del file HTML
    }),
    new CopyWebpackPlugin({
      patterns: [
        // Copia la favicon dalla directory "images" alla root della directory di output
        { from: "./src/images/earth.png", to: "./earth.png" },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
  },
};
