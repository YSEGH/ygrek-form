import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveForm, updateForm } from "../actions/actions--form-api";

const DragNDropDetails = () => {
  const dispatch = useDispatch();
  const { form_title, form_id, form_class, form_theme, rows } = useSelector(
    (state) => state.form
  );
  const {
    params: { param_id },
  } = useSelector((state) => state.app);

  const [formTitle, setFormTitle] = useState(form_title);
  const [formID, setFormID] = useState(form_id);
  const [formClass, setFormClass] = useState(form_class.join(", "));
  const [formTheme, setFormTheme] = useState(form_theme);

  const saveFormHandler = (e) => {
    e.preventDefault();
    let form = {
      form_title: formTitle,
      form_id: formID,
      form_class: JSON.stringify(
        formClass.split(",").map((element) => element.trim())
      ),
      form_theme: formTheme,
      rows: JSON.stringify(rows),
    };
    if (!param_id) {
      console.log("save");
      dispatch(saveForm(form));
    } else {
      console.log("form", form);
      console.log("update");
      form.id = param_id;
      dispatch(updateForm(form));
    }
  };

  useEffect(() => {
    setFormTitle(form_title);
    setFormID(form_id);
    setFormClass(form_class.join(", "));
    setFormTheme(form_theme);
    return () => {};
  }, [form_title, form_id, form_class, form_theme]);

  return (
    <div className="ygrek_form--details_container">
      <div className="ygrek_form--form_input ygrek_form--col-12">
        <label htmlFor="theme">Theme</label>
        <select
          name="theme"
          value={formTheme}
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
          value={formTitle}
        />
        <p></p>
      </div>
      <div className="ygrek_form--form_input ygrek_form--col-12">
        <label htmlFor="form_id">Form ID</label>
        <input
          type="text"
          name="form_id"
          onChange={(e) => setFormID(e.target.value)}
          value={formID}
        />
        <p></p>
      </div>
      <div className="ygrek_form--form_input ygrek_form--col-12">
        <label htmlFor="form_class">Classes CSS (Formulaire)</label>
        <input
          type="text"
          name="form_class"
          onChange={(e) => setFormClass(e.target.value)}
          value={formClass}
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
  );
};

export default DragNDropDetails;
