const dragNDropFormReducer = (
  state = {
    form_title: "",
    form_id: "",
    form_class: [],
    form_theme: "basic",
    rows: [],
  },
  action
) => {
  let newState;
  let rows;
  let row_index;
  let col_index;
  let col_id;
  let col = {
    classname: [
      "ygrek_form--col",
      "ygrek_form--form_input",
      "ygrek_form--col-12",
    ],
    custom_class_field: [],
    col_id: "",
    row_index: "",
    col_index: "",
    for: "",
    label: "",
    custom_class_label: [],
    input: "vide",
    input_element: null,
    input_type: null,
    default_value: "",
    custom_class_input: [],
    options: [],
    required: false,
    placeholder: "",
  };
  let newCol;
  switch (action.type) {
    case "SET_FORM":
      newState = {
        ...state,
        form_title: action.data.form_title,
        form_id: action.data.form_id,
        form_class: JSON.parse(action.data.form_class),
        form_theme: action.data.form_theme,
        rows: JSON.parse(action.data.rows),
      };
      return newState;
    case "RESET_FORM":
      newState = {
        ...state,
        form_title: "",
        form_id: "",
        form_class: [],
        form_theme: "basic",
        rows: [],
      };
      return newState;
    case "ADD_ROW":
      newState = {
        ...state,
        rows: [
          ...state.rows,
          {
            classname: [],
            row_id: action.data.row_id,
            row_index: action.data.row_index,
            cols: [],
          },
        ],
      };
      return newState;
    case "COL_IS_DRAGGED":
      rows = state.rows.removeOnDragClass();
      return { ...state, rows: rows };
    case "COL_IS_DRAGGED_OVER":
      rows = state.rows.removeOnDragClass(true);
      newState = {
        ...state,
        rows: rows,
      };
      if (action.data) {
        newState.rows[action.data.row_index].cols[
          action.data.col_index
        ].classname.push("dragged_hover");
      }
      return newState;
    case "DELETE_ROW":
      return {};
    case "ADD_COL":
      row_index = action.data.row_index;
      col_index = action.data.col_index;
      newCol = {
        ...col,
        col_id: action.data.col_id,
        row_index: row_index,
        col_index: col_index,
      };
      rows = state.rows
        .map((row) =>
          row.row_index == row_index
            ? {
                ...row,
                cols: [...row.cols, newCol],
              }
            : row
        )
        .reorderColIndex();
      return { ...state, rows: rows };
    case "DELETE_COL":
      row_index = action.data.row_index;
      col_id = action.data.col_id;
      rows = state.rows
        .map((row) =>
          row.row_index == row_index
            ? {
                ...row,
                cols: row.cols.filter((col) => col.col_id !== col_id),
              }
            : row
        )
        .reorderColIndex();
      return { ...state, rows: rows };
    case "UPDATE_COL":
      rows = state.rows;
      row_index = action.data.row_index;
      col_index = action.data.col_index;
      for (const property in action.data.values) {
        rows[row_index].cols[col_index][property] =
          action.data.values[property];
      }
      return { ...state, rows: rows };
    case "ROW_IS_DRAGGED_OVER":
      rows = state.rows.removeOnDragClass();
      newState = {
        ...state,
        rows: rows,
      };
      if (action.data) {
        newState.rows[action.data.row_index].classname.push("dragged_hover");
      }
      return newState;
    case "MOVE_COL":
      newState = {
        ...state,
        rows: state.rows
          .move(action.data.from, action.data.to)
          .removeOnDragClass(true),
      };
      return newState;
    default:
      return state;
  }
};

Array.prototype.removeOnDragClass = function (recursive = false) {
  for (let i = 0; i < this.length; i++) {
    const row = this[i];
    if (row.classname.includes("dragged_hover")) {
      this[i].classname = row.classname.filter(
        (classname) => classname !== "dragged_hover"
      );
    }
    if (recursive) {
      for (let k = 0; k < row.cols.length; k++) {
        const col = row.cols[k];
        if (col.classname.includes("dragged_hover")) {
          this[i].cols[k].classname = col.classname.filter(
            (classname) => classname !== "dragged_hover"
          );
        }
      }
    }
  }
  return this;
};

Array.prototype.move = function (from, to) {
  // Si le nombre de colonnes est inférieure à trois sur la ligne ciblée,
  // on ajoute la colonne à cette ligne.
  let col_from_items = this[from.row_index].cols;
  let col_to_items = this[to.row_index].cols;
  let from_item = this[from.row_index].cols[from.col_index];

  if (this[to.row_index].cols.length < 3 && from.row_index !== to.row_index) {
    col_to_items.push(from_item);
    this[to.row_index].cols = col_to_items;
    this[from.row_index].cols = col_from_items.filter(
      (col) => col.col_id !== from.col_id
    );
  } else {
    let to_item = this[to.row_index].cols[to.col_index];
    this[from.row_index].cols[from.col_index] = to_item;
    this[to.row_index].cols[to.col_index] = from_item;
  }
  this.reorderColIndex();
  return this;
};

Array.prototype.reorderColIndex = function () {
  for (let i = 0; i < this.length; i++) {
    const classnames = [
      "ygrek_form--col-4",
      "ygrek_form--col-6",
      "ygrek_form--col-12",
    ];
    let classname = "";
    let col_number = this[i].cols.length;

    if (col_number == 1) {
      classname = "ygrek_form--col-12";
    } else if (col_number == 2) {
      classname = "ygrek_form--col-6";
    } else if (col_number == 3) {
      classname = "ygrek_form--col-4";
    }
    for (let k = 0; k < this[i].cols.length; k++) {
      // On retire les précédentes Class
      let newClassname = this[i].cols[k].classname.filter(
        (item) => !classnames.includes(item)
      );
      this[i].cols[k].classname = [...newClassname, classname];
      this[i].cols[k].row_index = i;
      this[i].cols[k].col_index = k;
    }
  }
  return this;
};
export { dragNDropFormReducer };
