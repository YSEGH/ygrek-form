import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import Row from "./Row";
import Modal from "./Modal";
import { saveForm } from "../actions/actions--api";
import { addRow } from "../actions/actions--form";

const Form = () => {
  const dispatch = useDispatch();
  const { modal, active_col, dragging } = useSelector(
    (state) => state.dragNDrop
  );
  const { form_title, form_id, form_class, form_theme, rows } = useSelector(
    (state) => state.form
  );
  const [formTitle, setFormTitle] = useState(form_title);
  const [formID, setFormID] = useState(form_id);
  const [formClass, setFormClass] = useState(form_class.join(", "));
  const [formTheme, setFormTheme] = useState(form_theme);

  const saveFormHandler = (e) => {
    e.preventDefault();
    const form = {
      form_title: formTitle,
      form_id: formID,
      form_class: formClass,
      form_theme: formTheme,
      rows: JSON.stringify(rows),
    };
    dispatch(saveForm(form));
  };

  const addRowHandler = () => {
    let row_index = rows.length;
    const row_id = uuid();
    dispatch(addRow({ row_id: row_id, row_index: row_index }));
  };

  useEffect(() => {
    return () => {};
  }, [form_title, form_id, form_class, form_theme, rows, dragging]);

  return (
    <>
      <h1>Ajouter un formulaire</h1>
      <form
        className={`ygrek_form--form_container${dragging ? " dragging" : ""}`}
        id="ygrek_form--admin_ajouter"
        method="post"
      >
        <div className="ygrek_form--details_container">
          <div className="ygrek_form--form_input ygrek_form--col-12">
            <label htmlFor="theme">Theme</label>
            <select
              name="theme"
              defaultValue={form_theme}
              onChange={(e) => setFormTheme(e.target.value)}
            >
              <option value="basic">Basique</option>
              <option value="hiver">Hiver</option>
            </select>
            <p></p>
          </div>
          <div className="ygrek_form--form_input ygrek_form--col-12">
            <label htmlFor="form_title">Form Title</label>
            <input
              type="text"
              name="form_title"
              onChange={(e) => setFormTitle(e.target.value)}
              defaultValue={form_title}
            />
            <p></p>
          </div>
          <div className="ygrek_form--form_input ygrek_form--col-12">
            <label htmlFor="form_id">Form ID</label>
            <input
              type="text"
              name="form_id"
              onChange={(e) => setFormID(e.target.value)}
              defaultValue={form_id}
            />
            <p></p>
          </div>
          <div className="ygrek_form--form_input ygrek_form--col-12">
            <label htmlFor="form_class">Classes CSS (Formulaire)</label>
            <input
              type="text"
              name="form_class"
              onChange={(e) => setFormClass(e.target.value)}
              defaultValue={form_class.join(", ")}
            />
            <p></p>
          </div>
          <button
            form="ygrek_form--admin-ajouter"
            className="ygrek_form--button-submit"
            type="submit"
            onClick={saveFormHandler}
          >
            Sauvegarder
          </button>
        </div>
        <div className="ygrek_form--row_container">
          {rows.map((row) => (
            <Row key={row.row_index} row={row} />
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

export default Form;
