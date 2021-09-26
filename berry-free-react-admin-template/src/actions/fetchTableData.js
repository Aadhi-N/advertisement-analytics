import { SET_TABLE_DATA, FETCH_TABLE_DATA } from "./types";
import { apiAction } from "./apiAction";

export function fetchTableData() {
    return apiAction({
        url: `https://jsonplaceholder.typicode.com/todos`,
        onSuccess: setTableData,
        onFailure: () => console.log("Error occured loading articles"),
        label: FETCH_TABLE_DATA
    })
};

function setTableData(data) {
    return {
        type: SET_TABLE_DATA,
        payload: data
    }
}