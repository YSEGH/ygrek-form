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
    console.log("SAVE_FORM_ERROR", error);
    dispatch({ type: "SAVE_FORM_ERROR", message: error.response });
  }
};

const updateForm = (data) => async (dispatch) => {
  dispatch({ type: "UPDATE_FORM_REQUEST" });
  try {
    const response = await axios.put(baseURL + "/update", data);
    dispatch({ type: "UPDATE_FORM_SUCCESS", message: response.data.message });
  } catch (error) {
    console.log("UPDATE_FORM_ERROR", error);
    dispatch({ type: "UPDATE_FORM_ERROR", message: error.response });
  }
};

const getForms = () => async (dispatch) => {
  dispatch({ type: "GET_FORMS_REQUEST" });
  try {
    const response = await axios.get(baseURL + "/get");
    dispatch({
      type: "GET_FORMS_SUCCESS",
      data: response.data.forms,
      message: response.data.message,
    });
  } catch (error) {
    console.log("GET_FORMS_ERROR", error);
    dispatch({ type: "GET_FORMS_ERROR", message: error.response });
  }
};

const getForm = (data) => async (dispatch) => {
  let params = new URLSearchParams(data);
  dispatch({ type: "GET_FORM_REQUEST" });
  try {
    const response = await axios.get(baseURL + "/get", { params });
    dispatch({
      type: "GET_FORM_SUCCESS",
      form: response.data.forms[0],
      message: response.data.message,
    });
    dispatch(setForm(response.data.forms[0]));
  } catch (error) {
    console.log("GET_FORM_ERROR", error);
    dispatch({ type: "GET_FORM_ERROR", message: error.response });
  }
};
export { saveForm, updateForm, getForms, getForm };
