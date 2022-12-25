import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setColActive,
  colIsDragged,
  colIsDraggedOver,
  deleteCol,
  moveCol,
  openModal,
} from "../actions/actions";

const FormCol = ({ col }) => {
  const { colDragged, colDraggedOver } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const onDragStartHandler = () => {
    dispatch(
      colIsDragged({
        col_id: col.col_id,
        row_index: col.row_index,
        col_index: col.col_index,
      })
    );
  };

  const onDragEnterHandler = () => {
    dispatch(
      colIsDraggedOver({
        col_id: col.col_id,
        row_index: col.row_index,
        col_index: col.col_index,
      })
    );
  };

  const onDragLeaveHandler = () => {
    dispatch(colIsDraggedOver(null));
  };

  const onDragEndHandler = () => {
    if (colDragged && colDraggedOver) {
      if (colDragged.col_id !== colDraggedOver.col_id) {
        dispatch(
          moveCol({
            row_index: col.row_index,
            from: colDragged,
            to: colDraggedOver,
          })
        );
      }
    }
  };

  const onClickHandler = () => {
    dispatch(setColActive(col));
    dispatch(openModal());
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteCol({
        row_index: col.row_index,
        col_id: col.col_id,
      })
    );
  };

  return (
    <div
      className={col.classname.join(" ")}
      data-type="input"
      data-row={col.row_index}
      data-col={col.col_index}
      draggable
      onDragStart={onDragStartHandler}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragEnd={onDragEndHandler}
      onDragOver={(e) => {
        e.preventDefault();
        onDragEnterHandler();
      }}
      onClick={onClickHandler}
    >
      <h4>{col.col_id}</h4>
      <h4>{col.col_index}</h4>
      <button
        type="button"
        className="ygrek_form_admin--remove_col_button"
        data-row={col.row_index}
        data-col={col.col_index}
        onClick={() => onDeleteHandler()}
      >
        Delete
      </button>
    </div>
  );
};

export default FormCol;
