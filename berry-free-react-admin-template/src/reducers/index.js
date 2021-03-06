import { combineReducers } from "redux";

/* Reducer imports */
import customizationReducer from "./customizationReducer";
import { tableDataReducer } from "./tableDataReducer";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducers = combineReducers({
    customization: customizationReducer,
    tableData: tableDataReducer,
});

export default reducers;
