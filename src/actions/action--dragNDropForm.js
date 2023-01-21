const setForm = (data) => (dispatch) => {
  dispatch({ type: "SET_FORM", data: data });
};
const resetForm = () => (dispatch) => {
  dispatch({ type: "RESET_FORM" });
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
export { setForm, addRow, deleteRow, addCol, deleteCol, updateCol, resetForm };
