import { getData } from "./js/get.js";

async function showAlertWithData() {
  try {
    const data = await getData("los-angeles");
    alert(JSON.stringify(data)); // Mostra i dati nella finestra di alert
  } catch (error) {
    console.error(error);
  }
}
showAlertWithData();
