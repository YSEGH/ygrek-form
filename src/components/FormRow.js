import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addCol,
  colIsDraggedOver,
  moveCol,
  rowIsDraggedOver,
} from "../actions/actions";
import FormCol from "./FormCol";

const FormRow = ({ row_index, cols }) => {
  const { colDragged, colDraggedOver, rowDraggedOver } = useSelector(
    (state) => state.form
  );
  const dispatch = useDispatch();

  const addColHandler = () => {
    let col_index = cols.length;
    const col_id = uuid();
    if (col_index < 3) {
      dispatch(
        addCol({
          col_id: col_id,
          row_index: row_index,
          col_index: col_index,
        })
      );
    }
  };
  const onDragEnterHandler = () => {
    if (colDragged.row_index !== row_index) {
      dispatch(
        rowIsDraggedOver({
          row_index: row_index,
        })
      );
    }
  };
  const onDragEndHandler = () => {
    console.log("colDragged", colDragged);
    console.log("rowDraggedOver", rowDraggedOver);
    console.log("colDraggedOver", colDraggedOver);
    if (colDragged && rowDraggedOver && !colDraggedOver) {
      console.log("container is true");
      dispatch(
        moveCol({
          from: colDragged,
          to: rowDraggedOver,
        })
      );
    }
  };

  useEffect(() => {
    return () => {};
  }, [cols]);

  return (
    <div
      className="ygrek_form_admin--row"
      data-row={row_index}
      onDragEnd={onDragEndHandler}
      onDragEnter={onDragEnterHandler}
      onDragOver={(e) => {
        e.preventDefault();
        onDragEnterHandler();
      }}
    >
      <div className="ygrek_form_admin--col_container">
        {cols.map((col) => (
          <FormCol key={col.col_id} col={col} />
        ))}
      </div>
      <button
        type="button"
        className="ygrek_form_admin--add_col_button"
        onClick={addColHandler}
        data-row={row_index}
      >
        +
      </button>
    </div>
  );
};

export default FormRow;
