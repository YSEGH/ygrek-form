const apiReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
    success: null,
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_START":
      return { ...state, loading: true };
    case "SAVE_FORM_SUCCESS":
      return { ...state, loading: false, success: action.data };
    case "GET_FORM_SUCCESS":
      console.log(action.data);
      return {
        ...state,
        loading: false,
        data: action.data,
        success: "Les formulaires ont été récupérés avec succès.",
      };
    case "REQUEST_FAIL":
      return { ...state, loading: false, error: action.data };
    default:
      return state;
  }
};

export { apiReducer };
