import axios from "axios";

export function getData(url) {
  // Esempio di una richiesta GET

  return axios
    .get(url)
    .then((response) => {
      // Gestisci la risposta qui
      return response.data;
    })
    .catch((error) => {
      // Gestisci gli errori qui
      //console.error(error);
      throw error;
    });
}
