const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const param_id = urlParams.get("id");
const param_page = urlParams.get("page");
let page = param_page.split("-")[2];
const appReducer = (
  state = {
    page: page,
  },
  action
) => {
  switch (action.type) {
    case "SET_PAGE":
      console.log("action.data", action.data);
      return { ...state, page: action.data.target };
    default:
      return state;
  }
};

export { appReducer };
/* A FAIRE : 
  Gérer la route update,
  Reset le form quand on change de page ou de parametre
  */
