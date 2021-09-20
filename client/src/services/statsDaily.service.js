import axios from "axios";

export function getAllData(){
    const URLs = ["http://localhost:5555/stats/daily", "http://localhost:5555/stats/hourly", "http://localhost:5555/all", "http://localhost:5555/events/location", "http://localhost:5555/poi" ];
  return Promise.all(URLs.map(fetchData));
}

export async function fetchData(URL) {
  return axios
    .get(URL)
    .then(function(response) {
      return {
        success: true,
        data: response,
      };
    })
    .catch(function(error) {
      return { success: false };
    });
};
