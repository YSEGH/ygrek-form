import { combineReducers, applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { dragNDropReducer } from "./reducers/reducers--drag-n-drop";
import {
  getFormReducer,
  getFormsReducer,
  saveFormReducer,
  updateFormReducer,
} from "./reducers/reducers--form-api";
import { appReducer } from "./reducers/reducers--app";
import { formReducer } from "./reducers/reducers--form";
import { getSubmissionReducer } from "./reducers/reducers--submission-api";

const reducer = combineReducers({
  dragNDrop: dragNDropReducer,
  app: appReducer,
  form: formReducer,
  save: saveFormReducer,
  update: updateFormReducer,
  getForms: getFormsReducer,
  getForm: getFormReducer,
  getSubmission: getSubmissionReducer,
});

/* const composeEnhancer = compose; */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, {}, composeEnhancer(applyMiddleware(thunk)));
export default store;
