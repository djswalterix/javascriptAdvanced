//librerie
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.js";

import { getData } from "./js/get.js";
import { createElement, createProgress } from "./js/htmlElements.js";

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
    const cityEl = createElement("City col-1", cityName);
    document.querySelector(".cityHeading").append(cityEl);
    const cityScoreEl = createElement("CityScore col-6", cityScore.toFixed(1));
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
    alert("La cittá inserita non e presente nel nostro archivio");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // Ascolta l'evento submit del modulo del form
  document
    .getElementById("cityInput")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Previeni il comportamento predefinito del modulo

      // Ottieni il valore dalla casella di testo
      const city = document.getElementById("city").value;

      // Chiama la tua funzione passando il valore
      svuotaOutput();
      showCityElements(formatInputName(city));
    });
});

//divido in funzioni lo script

function createCategories(categories) {
  const categoryContainer = createElement("categories");
  let count = 0; // Contatore per tenere traccia degli elementi
  //ciclo le categorie
  for (const category of categories) {
    if (count % 4 === 0) {
      // Se count è un multiplo di 3, crea una nuova riga
      const rowDiv = createElement("row"); // Assicurati che la funzione createElement supporti "row"
      categoryContainer.appendChild(rowDiv);
    }
    //creo colonna
    const categoryDiv = createElement("category col-md-3 col-12");
    //creo elememti e gli valorizzo
    const categoryName = createElement("categoryName", category.name);
    const categoryProgress = createProgress(
      category.score_out_of_10,
      category.color
    );
    const categoryScore = createElement(
      "categoryScore col-md-2 col-2",
      category.score_out_of_10.toFixed(1)
    );
    const scoreAndProgressDiv = createElement("scoreAndProgressDiv row");

    //inserisco in colonna
    categoryDiv.appendChild(categoryName);

    scoreAndProgressDiv.appendChild(categoryProgress);
    scoreAndProgressDiv.appendChild(categoryScore);
    categoryDiv.appendChild(scoreAndProgressDiv);
    console.log(categoryDiv);

    const currentRow = categoryContainer.lastElementChild;
    currentRow.appendChild(categoryDiv);
    count++;
  }
  return categoryContainer;
}

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

function svuotaOutput() {
  // Ottieni l'elemento del div di output
  const outputDiv = document.getElementById("output");

  // Cancella tutto il contenuto dell'elemento del div
  outputDiv.innerHTML = "";
}
