import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { formReducer } from "./reducers/reducers";

const reducer = combineReducers({
  form: formReducer,
});

const composeEnhancer = compose;
const store = createStore(reducer, {}, composeEnhancer(applyMiddleware(thunk)));
export default store;

/* const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 */
