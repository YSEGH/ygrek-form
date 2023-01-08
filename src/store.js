import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { dragNDropReducer } from "./reducers/reducers--drag-n-drop";
import { apiReducer } from "./reducers/reducers--api";
import { appReducer } from "./reducers/reducers--app";
import { formReducer } from "./reducers/reducers--form";

const reducer = combineReducers({
  dragNDrop: dragNDropReducer,
  api: apiReducer,
  app: appReducer,
  form: formReducer,
});

/* const composeEnhancer = compose; */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, {}, composeEnhancer(applyMiddleware(thunk)));
export default store;
