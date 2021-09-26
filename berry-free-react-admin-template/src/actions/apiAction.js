import { API_START, API_END, ACCESS_DENIED, API_ERROR, API } from "./types";

/* Constants defined for HTTP request actions */
export const apiStart = label => ({
    type: API_START,
    payload: label
});

export const apiEnd = label => ({
    type: API_END,
    payload: label
});

export const accessDenied = url => ({
    type: ACCESS_DENIED,
    payload: {
        url
    }
});

export const apiError = error => ({
    type: API_ERROR,
    error
});

/* Meta-action creator to create an asyncronous HTTP action */

export const apiAction = ({
    url = "",
    method = "GET",
    data = null,
    onSuccess = () => {},
    onFailure = () => {},
    label = "",
    headersOverride = null

}) => {
    return {
        type: API,
        payload: {
            url,
            method,
            data,
            onSuccess,
            onFailure,
            label,
            headersOverride
        }
    };
};

