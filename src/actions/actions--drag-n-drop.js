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

export {
  dragging,
  setColActive,
  openModal,
  closeModal,
  moveCol,
  colIsDragged,
  colIsDraggedOver,
  rowIsDraggedOver,
};
