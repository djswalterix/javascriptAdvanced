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

export function getDataWithProgress(url, progressCallback) {
  return axios
    .get(url, {
      onDownloadProgress: (progressEvent) => {
        console.log(progressEvent.lengthComputable);
        if (progressEvent.lengthComputable) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          console.log(progress);
          progressCallback(progress);
        }
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
