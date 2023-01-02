import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addCol, moveCol, rowIsDraggedOver } from "../actions/actions";
import Col from "./Col";

const Row = ({ row }) => {
  const { colDragged, colDraggedOver, rowDraggedOver } = useSelector(
    (state) => state.form
  );
  const dispatch = useDispatch();

  const addColHandler = () => {
    let col_index = row.cols.length;
    const col_id = uuid();
    if (col_index < 3) {
      dispatch(
        addCol({
          col_id: col_id,
          row_index: row.row_index,
          col_index: col_index,
        })
      );
    }
  };

  const onDragEnterRowHandler = (e, row_id, row_index) => {
    if (colDragged) {
      if (colDragged.row_index !== row_index) {
        dispatch(
          rowIsDraggedOver({
            row_index: row_index,
          })
        );
      }
    }
  };

  const onDragLeaveRowHandler = (e, row_id) => {};

  const onDragEndRowHandler = (e) => {
    if (colDragged && rowDraggedOver && !colDraggedOver) {
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
  }, [row]);

  return (
    <div
      key={row.row_id}
      className={`ygrek_form--row ${row.classname.join(" ")}`}
      data-row={row.row_index}
      data-row-id={row.row_id}
      onDragEnter={
        row.cols.length === 0
          ? (e) => onDragEnterRowHandler(e, row.row_id, row.row_index)
          : undefined
      }
      onDragLeave={
        row.cols.length === 0
          ? (e) => onDragLeaveRowHandler(e, row.row_id)
          : undefined
      }
      onDragEnd={
        row.cols.length > 0 ? (e) => onDragEndRowHandler(e) : undefined
      }
      onDragOver={
        row.cols.length === 0
          ? (e) => {
              e.preventDefault();
              onDragEnterRowHandler(e, row.row_id, row.row_index);
            }
          : undefined
      }
    >
      <div className="ygrek_form--col_container">
        {row.cols.map((col) => (
          <Col key={col.col_id} col={col} />
        ))}
      </div>
      <button
        type="button"
        className="ygrek_form--button-add_col"
        onClick={addColHandler}
        data-row={row.row_index}
      >
        +
      </button>
    </div>
  );
};

export default Row;
