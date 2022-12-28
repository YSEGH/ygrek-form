import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRow, setFormID } from "../actions/actions";
import Row from "./Row";
import Modal from "./Modal";

const Form = () => {
  const dispatch = useDispatch();
  let { form_id, rows, modal, active_col, success, error } = useSelector(
    (state) => state.form
  );

  const setFormIDHandler = (e) => {
    dispatch(setFormID({ form_id: e.target.value }));
  };
  const addRowHandler = () => {
    let row_index = rows.length;
    dispatch(addRow({ row_index: row_index }));
  };

  useEffect(() => {
    return () => {};
  }, [rows]);

  return (
    <>
      <h1>Ajouter un formulaire</h1>
      <form
        className="ygrek_form_admin--form_container"
        id="ygrek_form_admin--ajouter"
        method="post"
      >
        <div className="ygrek_form_admin--form_group">
          <label htmlFor="form_id">Form ID</label>
          <input
            type="text"
            name="form_id"
            onChange={setFormIDHandler}
            value={form_id}
          />
        </div>
        <div className="ygrek_form_admin--row_container">
          {rows.map((row) => (
            <Row
              key={row.row_index}
              row_index={row.row_index}
              cols={row.cols}
            />
          ))}
        </div>
        <button
          type="button"
          className="ygrek_form_admin--add_row_button"
          onClick={addRowHandler}
        >
          + row
        </button>
        <button form="ygrek_form_admin--ajouter" type="submit">
          Envoyer
        </button>
      </form>
      {modal && <Modal col={active_col} />}
    </>
  );
};

export default Form;
