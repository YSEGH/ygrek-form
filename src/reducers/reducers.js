const formReducer = (
  state = {
    form_id: "",
    rows: [
      {
        row_index: 0,
        cols: [
          {
            classname: ["ygrek_form_admin--col", "ygrek_form_admin--col_4"],
            col_id: "deb9c09e-8d7b-495c-8803-b4b56cb47b67",
            row_index: 0,
            col_index: 0,
          },
          {
            classname: ["ygrek_form_admin--col", "ygrek_form_admin--col_4"],
            col_id: "0669a828-4799-4a2c-a8e1-787ae4179193",
            row_index: 0,
            col_index: 1,
          },
          {
            classname: ["ygrek_form_admin--col", "ygrek_form_admin--col_4"],
            col_id: "778eabe7-e873-4d08-9556-37d8f8264a6a",
            row_index: 0,
            col_index: 2,
          },
        ],
      },
    ],
    active_col: {},
    modal: false,
    loading: false,
    success: null,
    error: null,
    colDragged: {},
    colDraggedOver: {},
    rowDraggedOver: {},
  },
  action
) => {
  switch (action.type) {
    case "SET_FORM_ID":
      let newState = {
        ...state,
        form_id: action.data.form_id,
      };
      return newState;
    case "OPEN_MODAL":
      newState = {
        ...state,
        modal: true,
      };
      return newState;
    case "CLOSE_MODAL":
      newState = {
        ...state,
        modal: false,
        active_col: {},
      };
      return newState;
    case "SET_COL_ACTIVE":
      newState = {
        ...state,
        active_col: action.data,
      };
      return newState;
    case "ADD_ROW":
      newState = {
        ...state,
        rows: [...state.rows, { row_index: action.data.row_index, cols: [] }],
      };
      return newState;
    case "DELETE_ROW":
      return { loading: false, error: action.data };
    case "ADD_COL":
      let rows = state.rows
        .map((row) =>
          row.row_index == action.data.row_index
            ? {
                ...row,
                cols: [
                  ...row.cols,
                  {
                    classname: ["ygrek_form_admin--col"],
                    col_id: action.data.col_id,
                    row_index: action.data.row_index,
                    col_index: action.data.col_index,
                  },
                ],
              }
            : row
        )
        .reorderColIndex();
      newState = { ...state, rows: rows };
      return newState;
    case "DELETE_COL":
      rows = state.rows
        .map((row) =>
          row.row_index == action.data.row_index
            ? {
                ...row,
                cols: row.cols.filter(
                  (col) => col.col_id !== action.data.col_id
                ),
              }
            : row
        )
        .reorderColIndex();
      newState = { ...state, rows: rows };
      return newState;
    case "UPDATE_COL":
      return {};
    case "COL_IS_DRAGGED":
      newState = { ...state, colDragged: action.data };
      return newState;
    case "COL_IS_DRAGGED_OVER":
      newState = { ...state, colDraggedOver: action.data };
      return newState;
    case "ROW_IS_DRAGGED_OVER":
      newState = { ...state, rowDraggedOver: action.data };
      return newState;
    case "MOVE_COL":
      newState = {
        ...state,
        rows: state.rows.move(action.data.from, action.data.to),
      };
      state.colDragged = null;
      state.colDraggedOver = null;
      state.rowDraggedOver = null;
      console.log("MOVE_COL", newState.rows);
      return newState;
    case "SAVE_FORM_REQUEST":
      return { loading: true };
    case "SAVE_FORM_SUCCESS":
      return { loading: false, data: data };
    case "SAVE_FORM_ERROR":
      return { loading: false, data: data };
    case "RESET_FORM":
      return {};
    default:
      return state;
  }
};

Array.prototype.move = function (from, to) {
  console.log("FROM", from);
  console.log("TO", to);
  console.log(
    "this[to.row_index].cols",
    JSON.parse(JSON.stringify(this[to.row_index].cols))
  );
  // Si le nombre de colonnes est inférieure à trois sur la ligne ciblée,
  // on ajoute la colonne à cette ligne.
  let col_from_items = this[from.row_index].cols;
  let col_to_items = this[to.row_index].cols;
  let from_item = this[from.row_index].cols[from.col_index];

  if (this[to.row_index].cols.length < 3 && from.row_index !== to.row_index) {
    console.log("if");
    col_to_items.push(from_item);
    this[to.row_index].cols = col_to_items;
    this[from.row_index].cols = col_from_items.filter(
      (col) => col.col_id !== from.col_id
    );
  } else {
    let to_item = this[to.row_index].cols[to.col_index];

    console.log("else");
    this[from.row_index].cols[from.col_index] = to_item;
    this[to.row_index].cols[to.col_index] = from_item;
  }
  this.reorderColIndex();
  return this;
};

Array.prototype.reorderColIndex = function () {
  for (let i = 0; i < this.length; i++) {
    const classnames = [
      "ygrek_form_admin--col_4",
      "ygrek_form_admin--col_6",
      "ygrek_form_admin--col_12",
    ];
    let classname = "";
    let col_number = this[i].cols.length;

    if (col_number == 1) {
      classname = "ygrek_form_admin--col_12";
    } else if (col_number == 2) {
      classname = "ygrek_form_admin--col_6";
    } else if (col_number == 3) {
      classname = "ygrek_form_admin--col_4";
    }
    for (let k = 0; k < this[i].cols.length; k++) {
      console.log("this", this);
      console.log("[i][k]", i, k);
      // On retire les précédentes Class
      console.log("classname");
      let newClassname = this[i].cols[k].classname.filter(
        (item) => !classnames.includes(item)
      );
      console.log("classname after");
      this[i].cols[k].classname = [...newClassname, classname];
      this[i].cols[k].row_index = i;
      this[i].cols[k].col_index = k;
    }
  }
  return this;
};

export { formReducer };
