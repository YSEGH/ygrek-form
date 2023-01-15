import axios from "axios";
import { setForm } from "./actions--form";
const baseURL = window.location.origin + "/monouebsite/wp-json/yf-form/form";

const saveForm = (data) => async (dispatch) => {
  dispatch({ type: "SAVE_FORM_REQUEST" });
  try {
    const response = await axios.post(baseURL + "/add", data);
    dispatch({
      type: "SAVE_FORM_SUCCESS",
      message: response.data.message,
    });
  } catch (error) {
    dispatch({ type: "SAVE_FORM_ERROR", message: error.response.data });
  }
};

const updateForm = (data) => async (dispatch) => {
  dispatch({ type: "UPDATE_FORM_REQUEST" });
  try {
    const response = await axios.put(baseURL + "/update", data);
    dispatch({ type: "UPDATE_FORM_SUCCESS", message: response.data.message });
  } catch (error) {
    dispatch({ type: "UPDATE_FORM_ERROR", message: error.response.data });
  }
};

const getForms = () => async (dispatch) => {
  dispatch({ type: "GET_FORMS_REQUEST" });
  try {
    const response = await axios.post(baseURL + "/get");
    dispatch({
      type: "GET_FORMS_SUCCESS",
      data: response.data.form,
      message: response.data.message,
    });
  } catch (error) {
    dispatch({ type: "GET_FORMS_ERROR", message: error.response.data });
  }
};

const getForm = (data) => async (dispatch) => {
  dispatch({ type: "GET_FORM_REQUEST" });
  try {
    const response = await axios.post(baseURL + "/get", data);
    dispatch({
      type: "GET_FORM_SUCCESS",
      data: response.data.form[0],
      message: response.data.message,
    });
    dispatch(setForm(response.data.form[0]));
  } catch (error) {
    dispatch({ type: "GET_FORM_ERROR", message: error.response.data });
  }
};
export { saveForm, updateForm, getForms, getForm };
