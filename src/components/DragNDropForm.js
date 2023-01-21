import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import DragNDropRow from "./DragNDropRow";
import Modal from "./Modal";
import { addRow } from "../actions/action--dragNDropForm";

const DragNDropForm = () => {
  const dispatch = useDispatch();

  const { forms } = useSelector((state) => state.form);

  const { modal, active_col, dragging } = useSelector(
    (state) => state.dragNDrop
  );
  const { rows } = useSelector((state) => state.dragNDropForm);

  const addRowHandler = () => {
    let row_index = rows.length;
    const row_id = uuid();
    dispatch(addRow({ row_id: row_id, row_index: row_index }));
  };

  useEffect(() => {
    console.log(forms);
    return () => {};
  }, [rows]);

  return (
    <>
      <form
        className={`ygrek_form--form_container${dragging ? " dragging" : ""}`}
        id="ygrek_form--admin_ajouter"
        method="post"
      >
        <div className="ygrek_form--row_container">
          {rows.map((row) => (
            <DragNDropRow key={row.row_index} row={row} />
          ))}
          <button
            type="button"
            className="ygrek_form--button-add_row"
            onClick={addRowHandler}
          >
            + Ligne
          </button>
        </div>
      </form>

      {modal && <Modal col={active_col} />}
    </>
  );
};

export default DragNDropForm;
