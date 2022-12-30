import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setColActive,
  colIsDragged,
  colIsDraggedOver,
  moveCol,
  openModal,
  dragging,
} from "../actions/actions";

const Col = ({ col }) => {
  const { colDragged, colDraggedOver } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  /* COL */
  const onDragStartColHandler = (e, col_id, row_index, col_index) => {
    dispatch(
      colIsDragged({
        col_id: col_id,
        row_index: row_index,
        col_index: col_index,
      })
    );
    dispatch(dragging(true));
  };

  const onDragEnterColHandler = (e, col_id, row_index, col_index) => {
    dispatch(
      colIsDraggedOver({
        col_id: col_id,
        row_index: row_index,
        col_index: col_index,
      })
    );
  };

  const onDragLeaveColHandler = () => {
    dispatch(colIsDraggedOver(null));
  };

  const onDragEndColHandler = (e, row_index) => {
    if (colDraggedOver) {
      dispatch(
        moveCol({
          row_index: row_index,
          from: colDragged,
          to: colDraggedOver,
        })
      );
    }
    dispatch(dragging(false));
  };

  const onClickHandler = (col) => {
    dispatch(setColActive(col));
    dispatch(openModal());
  };

  useEffect(() => {
    return () => {};
  }, [col]);

  return (
    <div
      key={col.col_id}
      className={col.classname.join(" ")}
      onClick={() => onClickHandler(col)}
      data-row={col.row_index}
      data-col={col.col_index}
      data-col-id={col.col_id}
      draggable
      onDragStart={(e) =>
        onDragStartColHandler(e, col.col_id, col.row_index, col.col_index)
      }
      onDragEnter={(e) =>
        onDragEnterColHandler(e, col.col_id, col.row_index, col.col_index)
      }
      onDragLeave={(e) =>
        onDragLeaveColHandler(e, col.col_id, col.row_index, col.col_index)
      }
      onDragEnd={(e) => onDragEndColHandler(e, col.row_index)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragEnterColHandler(e, col.col_id, col.row_index, col.col_index);
      }}
    ></div>
  );
};

export default Col;
