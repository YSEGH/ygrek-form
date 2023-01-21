const formReducer = (
  state = {
    forms: [],
    loading: false,
    error: null,
    success: null,
  },
  action
) => {
  let newState;
  switch (action.type) {
    case "SAVE_FORM_REQUEST":
    case "UPDATE_FORM_REQUEST":
    case "GET_FORM_REQUEST":
    case "DELETE_FORM_REQUEST":
      return { ...state, loading: true };
    case "SAVE_FORM_SUCCESS":
    case "UPDATE_FORM_SUCCESS":
      return { ...state, loading: false, success: action.message };
    case "GET_FORM_SUCCESS":
      return {
        ...state,
        loading: false,
        forms: action.forms,
        success: action.message,
      };
    case "DELETE_FORM_SUCCESS":
      newState = {
        ...state,
        loading: false,
        success: action.message,
        forms: state.forms.filter((form) => form.id !== action.id),
      };
      return newState;
    case "SAVE_FORM_ERROR":
    case "UPDATE_FORM_ERROR":
    case "GET_FORMS_ERROR":
    case "DELETE_FORM_ERROR":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

export { formReducer };
