const path = require("path");

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
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
  },
};
