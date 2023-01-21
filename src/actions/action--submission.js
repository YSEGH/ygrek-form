import axios from "axios";
const baseURL =
  window.location.origin + "/monouebsite/wp-json/yf-form/submission";

const getSubmission = (data) => async (dispatch) => {
  let params = new URLSearchParams(data);
  dispatch({ type: "GET_SUBMISSION_REQUEST" });
  try {
    const response = await axios.get(baseURL + "/get", { params });
    dispatch({
      type: "GET_SUBMISSION_SUCCESS",
      submissions: response.data.submissions,
      message: response.data.message,
    });
  } catch (error) {
    console.log("GET_SUBMISSION_ERROR", error);
    dispatch({ type: "GET_SUBMISSION_ERROR", message: error.response });
  }
};

export { getSubmission };
