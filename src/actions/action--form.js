import axios from "axios";
import { setForm } from "./action--dragNDropForm";
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

const getForm = (data, dragNDrop) => async (dispatch) => {
  let params = new URLSearchParams(data);
  dispatch({ type: "GET_FORM_REQUEST" });
  try {
    const response = await axios.get(baseURL + "/get", { params });
    dispatch({
      type: "GET_FORM_SUCCESS",
      forms: response.data.forms,
      message: response.data.message,
    });
    if (dragNDrop) {
      dispatch(setForm(response.data.forms[0]));
    }
  } catch (error) {
    console.log("GET_FORM_ERROR", error);
    dispatch({ type: "GET_FORM_ERROR", message: error.response });
  }
};

const deleteForm = (data) => async (dispatch) => {
  let params = new URLSearchParams(data);
  dispatch({ type: "DELETE_FORM_REQUEST" });
  try {
    const response = await axios.delete(baseURL + "/delete", { params });
    dispatch({
      type: "DELETE_FORM_SUCCESS",
      id: data.id,
      message: response.data.message,
    });
  } catch (error) {
    console.log("DELETE_FORM_ERROR", error);
    dispatch({ type: "DELETE_FORM_ERROR", message: error.response });
  }
};
export { saveForm, updateForm, getForm, deleteForm };
