import { createElement, createProgress } from "./htmlElements.js";

//metodo che crea le categorie
export function createCategories(categories) {
  const categoryContainer = createElement("categories");
  let count = 0; // Contatore per tenere traccia degli elementi
  //ciclo le categorie
  for (const category of categories) {
    if (count % 4 === 0) {
      // Se count è un multiplo di 4, crea una nuova riga
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
    //console.log(categoryDiv);

    const currentRow = categoryContainer.lastElementChild;
    currentRow.appendChild(categoryDiv);
    count++;
  }
  return categoryContainer;
}

//metodo per pulire lóutput
export function emptyOutput() {
  // Ottieni l'elemento del div di output
  const outputDiv = document.getElementById("output");

  // Cancella tutto il contenuto dell'elemento del div
  outputDiv.innerHTML = "";
}
