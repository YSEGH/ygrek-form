import axios from "axios";
import { setForm } from "./actions--form";
const baseURL = window.location.origin + "/monouebsite/wp-json/yf-form";

const saveForm = (data) => async (dispatch) => {
  dispatch({ type: "REQUEST_START" });
  try {
    const response = await axios.post(baseURL + "/add", data);
    dispatch({ type: "SAVE_FORM_SUCCESS", data: response.data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: "REQUEST_ERROR", payload: error.response.data });
  }
};

const getForm = () => async (dispatch) => {
  dispatch({ type: "REQUEST_START" });
  try {
    const response = await axios.post(baseURL + "/get");
    dispatch({ type: "GET_FORM_SUCCESS", data: response.data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: "REQUEST_ERROR", payload: error.response.data });
  }
};

const getFormById = (data) => async (dispatch) => {
  dispatch({ type: "RESET_FORM" });
  dispatch({ type: "REQUEST_START" });
  try {
    const response = await axios.post(baseURL + "/get", data);
    dispatch({ type: "GET_FORM_SUCCESS", data: response.data });
    console.log(response.data);
    dispatch(setForm(response.data[0]));
  } catch (error) {
    dispatch({ type: "REQUEST_ERROR", payload: error.response.data });
  }
};
export { saveForm, getForm, getFormById };
