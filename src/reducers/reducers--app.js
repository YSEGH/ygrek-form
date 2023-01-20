import { getIdParam, getPageParam } from "../actions/actions--app";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = getPageParam(null, urlParams);
const id = getIdParam(null, urlParams);

const appReducer = (
  state = {
    page: page,
    data: null,
    params: { param_id: id, param_page: page },
  },
  action
) => {
  let newState;
  switch (action.type) {
    case "SET_PARAMS":
      newState = { ...state, params: action.data };
      return newState;
    default:
      return state;
  }
};

export { appReducer };
