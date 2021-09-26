import { combineReducers } from "redux";

/* Reducer imports */
import customizationReducer from "./customizationReducer";
import articleDetailsReducer from "./articleDetailsReducer";
import tableDataReducer from "./tableDataReducer";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
    customization: customizationReducer,
    tableData: tableDataReducer,
    articleDetails: articleDetailsReducer
});

export default reducer;