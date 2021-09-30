import { SET_TABLE_DATA } from "./types";
import { useDispatch } from "react-redux";
import axios from "axios";

// const dispatch = useDispatch();

// export const fetchTableData = async () => {
//     const response = await axios
//     .get("https://jsonplaceholder.typicode.com/todos")
//     .catch((err) => {
//         dispatch( {
//             type: TABLE_DATA_ERROR,
//             payload: err,
//         })
//         console.log("Err", err);
//     });
//     dispatch(setTableData(response.data));
// };


export const setTableData = (tableData) => {
    return {
        type: SET_TABLE_DATA,
        payload : tableData
    };
};
