import axios from "axios";

const dragging = (data) => (dispatch) => {
  dispatch({ type: "DRAGGING", data: data });
};
const openModal = (data) => (dispatch) => {
  dispatch({ type: "OPEN_MODAL", data: data });
};
const closeModal = (data) => (dispatch) => {
  dispatch({ type: "CLOSE_MODAL", data: data });
};
const setColActive = (data) => (dispatch) => {
  dispatch({ type: "SET_COL_ACTIVE", data: data });
};
const moveCol = (data) => (dispatch) => {
  dispatch({ type: "MOVE_COL", data: data });
};
const colIsDragged = (data) => (dispatch) => {
  dispatch({ type: "COL_IS_DRAGGED", data: data });
};
const colIsDraggedOver = (data) => (dispatch) => {
  dispatch({ type: "COL_IS_DRAGGED_OVER", data: data });
};
const rowIsDraggedOver = (data) => (dispatch) => {
  dispatch({ type: "ROW_IS_DRAGGED_OVER", data: data });
};
const addRow = (data) => (dispatch) => {
  dispatch({ type: "ADD_ROW", data: data });
};
const deleteRow = (data) => (dispatch) => {
  dispatch({ type: "DELETE_ROW", data: data });
};
const addCol = (data) => (dispatch) => {
  dispatch({ type: "ADD_COL", data: data });
};
const deleteCol = (data) => (dispatch) => {
  dispatch({ type: "DELETE_COL", data: data });
};
const updateCol = (data) => (dispatch) => {
  dispatch({ type: "UPDATE_COL", data: data });
};
const saveForm = (data) => async (dispatch) => {
  dispatch({ type: "SAVE_FORM_REQUEST" });
  try {
    const response = await axios.post("/api/save_form/", data);
    dispatch({ type: "SAVE_FORM_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "SAVE_FORM_FAIL", payload: error.response.data.message });
  }
};
const setDetails = (data) => (dispatch) => {
  dispatch({ type: "SET_FORM_DETAILS", data: data });
};
const resetForm = () => (dispatch) => {
  dispatch({ type: "RESET_FORM" });
};
export {
  dragging,
  setDetails,
  setColActive,
  openModal,
  closeModal,
  addRow,
  deleteRow,
  addCol,
  deleteCol,
  updateCol,
  moveCol,
  colIsDragged,
  colIsDraggedOver,
  rowIsDraggedOver,
  saveForm,
  resetForm,
};
