import axios from "axios";
import { API } from "../actions/types";
import { accessDenied, apiError, apiStart, apiEnd } from "../actions/apiAction";

const apiMiddleware = ({ dispatch, getState }) => next => action => {

    if (action.type !== API) {
        return;
    } 

        const {
            url,
            method,
            data,
            onSuccess,
            onFailure,
            label,
            headers
        } = action.payload;
    
        
        const dataOrParams = ["GET"].includes(method) ? "params" : "data";
    
        /* Axios default configs */
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
        axios.defaults.headers.common["Content-Type"] = "application/json";
    
        if (label) {
            dispatch(apiStart(label));
        }
    
        axios.request({
            url, 
            method, 
            headers, 
            [dataOrParams]: data
        })
        .then(( data ) => {
            dispatch(onSuccess(data));
        })
        .catch(error => {
            dispatch(apiError(error));
            dispatch(onFailure(error));
    
            if (error.response && error.response.status === 403) {
                dispatch(accessDenied(window.location.pathname));
    
            }
        })
        .finally(() => {
            if (label) {
                dispatch(apiEnd(label));
            }
        });
    

    next(action);


};

export default apiMiddleware;