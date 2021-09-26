import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import apiMiddleware from "../middleware/apiMiddleware";

// ===========================|| REDUX - MAIN STORE ||=========================== //

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));
// const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(apiMiddleware)));
// const store = createStore(reducer, applyMiddleware(thunk))
const persister = 'Demo'; // ????

export { store, persister };


