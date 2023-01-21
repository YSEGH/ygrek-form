const submissionReducer = (
  state = {
    submissions: [],
    loading: false,
    error: null,
    success: null,
  },
  action
) => {
  switch (action.type) {
    case "GET_SUBMISSION_REQUEST":
      return { ...state, loading: true };
    case "GET_SUBMISSION_SUCCESS":
      return {
        ...state,
        loading: false,
        submissions: action.submissions,
        success: action.message,
      };
    case "GET_SUBMISSION_ERROR":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

export { submissionReducer };
