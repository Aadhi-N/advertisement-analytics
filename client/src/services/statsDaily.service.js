import axios from "axios";


// export function getStatsDaily() {
    //     return new Promise((resolve) => {
        //         axios.get(url).then((response) => {
            //             resolve({ response: response.data })
            //         });
            //     })
            // };
            
            
            
export function getAllData(){
    const URLs = ["http://localhost:5555/stats/daily", "http://localhost:5555/stats/hourly", "http://localhost:5555/all"];
  return Promise.all(URLs.map(fetchData));
}

function fetchData(URL) {
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
