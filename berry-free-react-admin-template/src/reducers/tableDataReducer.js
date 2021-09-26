import {
    SET_TABLE_DATA,
    API_START,
    API_END,
    FETCH_TABLE_DATA
} from "../actions/types";

// export const initialState = {
//     data: []
// }

// ===========================|| TABLE DATA REDUCER ||=========================== //

function foo(state = {}, action) {
    console.log("action type => ", action.type);
    switch (action.type) {
        case SET_TABLE_DATA: 
            return { data: action.payload };
        case API_START:
            if (action.payload === FETCH_TABLE_DATA) {
                return {
                    ...state,
                    isLoadingData: true
                };
            }
            break;
        case API_END:
            if (action.payload === FETCH_TABLE_DATA) {
                return {
                    ...state,
                    isLoadingData: false
                };
            }
            break;
        default:
            return state; 
    }
};

// export default tableDataReducer;

export default foo;