import { getData } from "./get.js";
import { createElement, createProgress } from "./htmlElements.js";
import { createCategories } from "./categoryElements.js";

//chiamo le funzioni
export async function showCityElements(city) {
  try {
    const progressLoading = document.getElementById("progressLoading");
    progressLoading.children[0].style.width = "0%";
    const data = await fetchData(city);
    createCityHeader(city, data.teleport_city_score);
    createDescription(data.summary);
    createCategoriesEl(data.categories);
    // Aggiorna la barra di caricamento al 100%
    progressLoading.children[0].style.width = "100%";
  } catch (error) {
    if (error instanceof CityNotFoundError) {
      alert(error.message);
    } else {
      console.error("Errore sconosciuto:", error);
      alert("An unknown error occurred while retrieving the data.");
    }
  }
}

//prendo i dati
async function fetchData(city) {
  await waitseconds(500); //meodo per fare vedere che la progress funziona
  try {
    const url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;
    const data = await getData(url);
    return data;
  } catch (error) {
    //contorllo errori
    if (error.response && error.response.status === 404) {
      throw new CityNotFoundError();
    } else {
      throw error;
    }
  }
}
//creo errore per la citta non in db
class CityNotFoundError extends Error {
  constructor() {
    super("City not found in the database");
    this.name = "CityNotFoundError";
  }
}
//creo la prima riga con nome citta e valutazione complessiva
function createCityHeader(city, score) {
  const rowDiv = createElement("row cityHeading");
  document.querySelector(".output").append(rowDiv);

  const cityName = formatCityName(city);
  const cityEl = createElement("City col-4", cityName);
  document.querySelector(".cityHeading").append(cityEl);

  const cityScoreEl = createElement(
    "CityScore col-6",
    "Score: " + score.toFixed(1)
  );
  document.querySelector(".cityHeading").append(cityScoreEl);
}
//stacco il crea descrizione cosi e un attimo piu leggibile
function createDescription(summary) {
  const description = createElement("description", summary);
  document.querySelector(".output").append(description);
}
//idem con le categorie
function createCategoriesEl(categories) {
  const categoryEl = createCategories(categories);
  document.querySelector(".output").append(categoryEl);
}
//formatto nome citta correttamente
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

function waitseconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds); // 2000 millisecondi (2 secondi)
  });
}
