//librerie
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.js";
import "./js/styleModule.js";
import "@fortawesome/fontawesome-free/js/all";

import { showCityElements } from "./js/cityElements.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  // Ascolta l'evento submit del modulo del form
  document
    .getElementById("cityInput")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Previeni il comportamento predefinito del modulo

      // Ottieni il valore dalla casella di testo
      const city = document.getElementById("city").value;

      // Chiama la tua funzione passando il valore
      emptyOutput();
      showCityElements(formatInputName(city));
    });
});

//divido in funzioni lo script
//formatto input per avitare problemi di maiuscole/spazi
function formatInputName(inputString) {
  // Rimuovi spazi bianchi all'inizio e alla fine
  const trimmedString = inputString.trim();

  // Sostituisci gli spazi con il carattere "-"
  const hyphenatedString = trimmedString.replace(/\s+/g, "-").toLowerCase();

  return hyphenatedString;
}
//metodo per pulire lóutput
function emptyOutput() {
  // Ottieni l'elemento del div di output
  const outputDiv = document.getElementById("output");

  // Cancella tutto il contenuto dell'elemento del div
  outputDiv.innerHTML = "";
}
