//librerie
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.js";
import "./js/styleModule.js";
import "@fortawesome/fontawesome-free/js/all";

import { getData } from "./js/get.js";
import { createElement } from "./js/htmlElements.js";
import { createCategories, emptyOutput } from "./js/htlmElementsSpecific.js";

document.addEventListener("DOMContentLoaded", function () {
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

function formatCityName(inputString) {
  // Dividi la stringa in parole separate dalla barra "-"
  const words = inputString.split("-");

  // Converte ogni parola iniziale in maiuscolo
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Unisci le parole in una singola stringa
  const formattedString = formattedWords.join(" ");

  return formattedString;
}

function formatInputName(inputString) {
  // Rimuovi spazi bianchi all'inizio e alla fine
  const trimmedString = inputString.trim();

  // Sostituisci gli spazi con il carattere "-"
  const hyphenatedString = trimmedString.replace(/\s+/g, "-").toLowerCase();

  return hyphenatedString;
}

async function showCityElements(city) {
  try {
    //const city = "los-angeles";
    const url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;
    //prendo get
    const data = await getData(url);
    //estraggo descrioone

    const summary = data.summary;
    //citta e score
    const cityScore = data.teleport_city_score;
    const rowDiv = createElement("row cityHeading");
    document.querySelector(".output").append(rowDiv);
    //agiungo riga per formattare meglio
    const cityName = formatCityName(city);
    const cityEl = createElement("City col-4", cityName);
    document.querySelector(".cityHeading").append(cityEl);
    const cityScoreEl = createElement(
      "CityScore col-6",
      "Score: " + cityScore.toFixed(1)
    );
    document.querySelector(".cityHeading").append(cityScoreEl);
    //descrizione
    let description = createElement("description", summary);
    //inserisco descrizione a video
    document.querySelector(".output").append(description);
    //salvo val
    const categories = data.categories;
    const categoryEl = createCategories(categories);
    document.querySelector(".output").append(categoryEl);
  } catch (error) {
    alert("This city is not found in our database.");
  }
}
