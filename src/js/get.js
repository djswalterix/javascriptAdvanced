import axios from "axios";

export function getData(city) {
  // Esempio di una richiesta GET
  const urlCity = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;
  return axios
    .get(urlCity)
    .then((response) => {
      // Gestisci la risposta qui
      return response.data;
    })
    .catch((error) => {
      // Gestisci gli errori qui
      console.error(error);
      throw error;
    });
}
