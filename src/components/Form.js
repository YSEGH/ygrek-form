import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addRow, setFormID } from "../actions/actions";
import Row from "./Row";
import Modal from "./Modal";

const Form = () => {
  const dispatch = useDispatch();
  const { form_id, rows, modal, active_col, success, error, dragging } =
    useSelector((state) => state.form);

  const setFormIDHandler = (e) => {
    dispatch(setFormID({ form_id: e.target.value }));
  };
  const addRowHandler = () => {
    let row_index = rows.length;
    const row_id = uuid();
    dispatch(addRow({ row_id: row_id, row_index: row_index }));
  };

  useEffect(() => {
    return () => {};
  }, [rows, dragging]);

  return (
    <>
      <h1>Ajouter un formulaire</h1>
      <form
        className={`ygrek_form_admin--form_container ${
          dragging ? "dragging" : ""
        }`}
        id="ygrek_form_admin--ajouter"
        method="post"
      >
        <div className="form_group">
          <div className="form_input form_input--col-6">
            <label htmlFor="form_id">Form ID</label>
            <input
              type="text"
              name="form_id"
              onChange={setFormIDHandler}
              value={form_id}
            />
            <p></p>
          </div>
          <div className="form_input form_input--col-6">
            <label htmlFor="theme">Theme</label>
            <select name="theme">
              <option value="basic">Basique</option>
            </select>
            <p></p>
          </div>
        </div>
        <div className="ygrek_form_admin--row_container">
          {rows.map((row) => (
            <Row key={row.row_index} row={row} />
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
