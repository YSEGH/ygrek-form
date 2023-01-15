const saveFormReducer = (
  state = {
    loading: false,
    error: null,
    success: null,
  },
  action
) => {
  switch (action.type) {
    case "SAVE_FORM_REQUEST":
      return { ...state, loading: true };
    case "SAVE_FORM_SUCCESS":
      return { ...state, loading: false, success: action.message };
    case "SAVE_FORM_ERROR":
      return { ...state, loading: false, error: action.data };
    default:
      return state;
  }
};

const updateFormReducer = (
  state = {
    loading: false,
    error: null,
    success: null,
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_FORM_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_FORM_SUCCESS":
      return { ...state, loading: false, success: action.message };
    case "UPDATE_FORM_ERROR":
      return { ...state, loading: false, error: action.data };
    default:
      return state;
  }
};

const getFormsReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
    success: null,
  },
  action
) => {
  switch (action.type) {
    case "GET_FORMS_REQUEST":
      return { ...state, loading: true };
    case "GET_FORMS_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
        success: action.message,
      };
    case "GET_FORMS_ERROR":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

const getFormReducer = (
  state = {
    data: {},
    loading: false,
    error: null,
    success: null,
  },
  action
) => {
  switch (action.type) {
    case "GET_FORM_REQUEST":
      return { ...state, loading: true };
    case "GET_FORM_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
        success: action.message,
      };
    case "GET_FORM_ERROR":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

export { saveFormReducer, updateFormReducer, getFormsReducer, getFormReducer };
