const dragNDropReducer = (
  state = {
    dragging: false,
    active_col: {},
    modal: false,
    colDragged: null,
    colDraggedOver: null,
    rowDraggedOver: null,
  },
  action
) => {
  let newState;
  switch (action.type) {
    case "DRAGGING":
      return {
        ...state,
        dragging: action.data,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modal: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: false,
        active_col: {},
      };
    case "SET_COL_ACTIVE":
      newState = {
        ...state,
        active_col: action.data,
      };
      return newState;
    case "COL_IS_DRAGGED":
      return {
        ...state,
        colDragged: action.data,
      };
    case "COL_IS_DRAGGED_OVER":
      return {
        ...state,
        colDraggedOver: action.data,
      };
    case "ROW_IS_DRAGGED_OVER":
      return {
        ...state,
        rowDraggedOver: action.data,
      };
    case "MOVE_COL":
      return {
        ...state,
        colDragged: null,
        colDraggedOver: null,
        rowDraggedOver: null,
      };
    default:
      return state;
  }
};

export { dragNDropReducer };
