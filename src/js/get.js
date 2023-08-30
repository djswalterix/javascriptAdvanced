import axios from "axios";

// Esempio di una richiesta GET
axios
  .get("https://api.example.com/data")
  .then((response) => {
    // Gestisci la risposta qui
    console.log(response.data);
  })
  .catch((error) => {
    // Gestisci gli errori qui
    console.error(error);
  });
