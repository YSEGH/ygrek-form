import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setColActive,
  colIsDragged,
  colIsDraggedOver,
  deleteCol,
  moveCol,
  openModal,
} from "../actions/actions";
import ColForm from "./ColForm";

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

  const onDragEnterHandler = (e) => {
    console.log('colDragged.col_id', colDragged.col_id)
    console.log('E', e)
    console.log('e.target.dataset.id', e.target.dataset.id.split('col-')[1])
    if (colDragged.col_id !== e.target.dataset.id){
      dispatch(
          colIsDraggedOver({
            col_id: col.col_id,
            row_index: col.row_index,
            col_index: col.col_index,
          })
      );
    }
  };

  const onDragLeaveHandler = (e) => {
    dispatch(colIsDraggedOver(null));
  };

  const onDragEndHandler = (e) => {
    if (colDragged && colDraggedOver) {
      if (colDragged.col_id !== colDraggedOver.col_id) {
        dispatch(
          moveCol({
            row_index: col.row_index,
            from: colDragged,
            to: colDraggedOver,
          })
        );
        removeColDraggedOverBackground();
      }
    }
  };

  const addColDraggedOverBackground = () => {
    if (colDraggedOver && Object.keys(colDraggedOver).length > 0){
      let col = document.querySelector(`[data-id="col-${colDraggedOver.col_id}"]`);
      col.classList.add('dragged_over');
    } else {
      removeColDraggedOverBackground();
    }

  }

  const removeColDraggedOverBackground = () => {
    let cols = document.getElementsByClassName('dragged_over');
    for (const col of cols) {
      col.classList.remove('dragged_over');
    }
  }

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

  useEffect(() => {
    addColDraggedOverBackground();
    return () => {};
  }, [col, colDraggedOver]);

  return (
    <div
      className={col.classname.join(" ")}
      data-type="input"
      data-row={col.row_index}
      data-col={col.col_index}
      data-id={`col-${col.col_id}`}
      draggable
      onDragStart={onDragStartHandler}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragEnd={onDragEndHandler}
      onDragOver={(e) => {
        e.preventDefault();
        onDragEnterHandler(e);
      }}
    >
      <ColForm col={col} />
      <div className="ygrek_form_admin--col_button_container">
        <button
          type="button"
          className="ygrek_form_admin--edit_col_button"
          data-row={col.row_index}
          data-col={col.col_index}
          onClick={onClickHandler}
          disabled={col.input === "vide"}
        >
          Edit
        </button>
        <button
          type="button"
          className="ygrek_form_admin--remove_col_button"
          data-row={col.row_index}
          data-col={col.col_index}
          onClick={onDeleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FormCol;
