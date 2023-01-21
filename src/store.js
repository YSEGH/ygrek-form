import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { dragNDropReducer } from "./reducers/reducer--dragNDrop";
import { appReducer } from "./reducers/reducer--app";
import { dragNDropFormReducer } from "./reducers/reducer--dragNDropForm";
import { submissionReducer } from "./reducers/reducer--submission";
import { formReducer } from "./reducers/reducer--form";

const reducer = combineReducers({
  app: appReducer,
  dragNDrop: dragNDropReducer,
  dragNDropForm: dragNDropFormReducer,
  form: formReducer,
  submission: submissionReducer,
});

/* const composeEnhancer = compose; */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, {}, composeEnhancer(applyMiddleware(thunk)));
export default store;
