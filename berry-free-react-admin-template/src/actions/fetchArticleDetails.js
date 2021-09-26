import { SET_ARTICLE_DETAILS, FETCH_ARTICLE_DETAILS } from "./types";
import { apiAction } from "./apiAction";

export function fetchArticleDetails() {
    return apiAction({
        url: `https://jsonplaceholder.typicode.com/todos`,
        onSuccess: setArticleDetails,
        onFailure: () => console.log("Error occured loading articles"),
        label: FETCH_ARTICLE_DETAILS
    })
};

function setArticleDetails(data) {
    return {
        type: SET_ARTICLE_DETAILS,
        payload: data
    }
};

