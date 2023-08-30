const path = require("path");

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
        use: ["style-loader", "css-loader"], // Caricamento di file CSS
      },
    ],
  },
};
