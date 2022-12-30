import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, updateCol } from "../actions/actions";

const Modal = ({ col }) => {
  const [customClassField, setCustomClassField] = useState(
    col.custom_class_field.join(", ")
  );
  const [customClassLabel, setCustomClassLabel] = useState(
    col.custom_class_label.join(", ")
  );
  const [customClassInput, setCustomClassInput] = useState(
    col.custom_class_input.join(", ")
  );
  const [input, setInput] = useState(col.input);
  const [placeholder, setPlaceholder] = useState(col.placeholder);
  const [label, setLabel] = useState(col.label);
  const [defaultValue, setDefaultValue] = useState(col.default_value);
  const [options, setOptions] = useState(col.options);
  const [optionLabel, setOptionLabel] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const addOptionHandler = () => {
    setOptions([
      ...options,
      {
        label: optionLabel,
        value: optionValue,
      },
    ]);
    setOptionLabel("");
    setOptionValue("");
  };
  const onCloseHandler = () => {
    dispatch(closeModal({}));
  };

  const onSaveHandler = () => {
    let values = {};
    values = getFieldType(input);
    values["label"] = label;
    values["custom_class_field"] = customClassField
      .split(",")
      .map((element) => element.trim());
    values["custom_class_label"] = customClassLabel
      .split(",")
      .map((element) => element.trim());
    values["custom_class_input"] = customClassInput
      .split(",")
      .map((element) => element.trim());
    values["placeholder"] = placeholder;
    values["default_value"] = defaultValue;
    values["options"] = options;

    dispatch(
      updateCol({
        col_index: col.col_index,
        row_index: col.row_index,
        values: values,
      })
    );
  };

  const getFieldType = (type) => {
    let values = {};
    values["input"] = type;
    switch (type) {
      case "nom":
      case "prenom":
      case "texte_court":
        values["input_element"] = "input";
        values["input_type"] = "text";
        break;
      case "liste":
        values["input_element"] = "select";
        break;
      case "telephone":
        values["input_element"] = "input";
        values["input_type"] = "tel";
        break;
      case "color":
        values["input_element"] = "input";
        values["input_type"] = "color";
        break;
      case "file":
        values["input_element"] = "input";
        values["input_type"] = "file";
        break;
      case "date":
        values["input_element"] = "input";
        values["input_type"] = "date";
        break;
      case "email":
        values["input_element"] = "input";
        values["input_type"] = "email";
        break;
      case "case_a_cocher":
        values["input_element"] = "input";
        values["input_type"] = "checkbox";
        break;
      case "radio":
        values["input_element"] = "input";
        values["input_type"] = "radio";
        break;
      case "texte_long":
        values["input_element"] = "textarea";
        break;
      default:
        break;
    }
    return values;
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
    return () => {};
  }, [options]);

  return (
    <div className="ygrek_form_admin--modal_overlay">
      <div className="ygrek_form_admin--modal_content">
        <div className="ygrek_form_admin--modal_header">
          <h1>{col.input}</h1>
          <button onClick={onCloseHandler}>Fermer</button>
        </div>
        <div className="ygrek_form_admin--modal_body">
          <div className="form_group">
            <div className="form_input form_input--col-6 form_input--text">
              <label>Classes CSS (Formulaire)</label>
              <input
                type="text"
                value={customClassField}
                onChange={(e) => setCustomClassField(e.target.value)}
              />
              <p></p>
            </div>
          </div>
          <div className="form_group">
            <div className="form_input form_input--col-6 form_input--text">
              <label>Libellé</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
              <p></p>
            </div>
            <div className="form_input form_input--col-6 form_input--text">
              <label>Classes CSS (Libellé)</label>
              <input
                type="text"
                value={customClassLabel}
                onChange={(e) => setCustomClassLabel(e.target.value)}
              />
              <p>Séparez les différentes classes par des virgules</p>
            </div>
          </div>
          <div className="form_group">
            <div className="form_input form_input--col-6 form_input--select">
              <label>Input</label>
              <select
                defaultValue={input}
                onChange={(e) => setInput(e.target.value)}
              >
                <option value={"vide"}>Vide</option>
                <option value={"nom"}>Nom</option>
                <option value={"prenom"}>Prénom</option>
                <option value={"date"}>Date</option>
                <option value={"color"}>color</option>
                <option value={"fichier"}>Fichier</option>
                <option value={"texte_court"}>Texte court</option>
                <option value={"liste"}>Liste</option>
                <option value={"telephone"}>Téléphone</option>
                <option value={"email"}>Email</option>
                <option value={"case_a_cocher"}>Case à cocher</option>
                <option value={"radio"}>Radio</option>
                <option value={"texte_long"}>Texte long</option>
              </select>
              <p></p>
            </div>
            <div className="form_input form_input--col-6 form_input--text">
              <label>Classes CSS (Champ)</label>

              <input
                type="text"
                value={customClassInput}
                onChange={(e) => setCustomClassInput(e.target.value)}
              />
              <p>Séparez les différentes classes par des virgules</p>
            </div>
          </div>
          <div className="form_group">
            <div className="form_input form_input--col-6 form_input--text">
              <label>Placeholder</label>
              <input
                type="text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
              <p></p>
            </div>
            <div className="form_input form_input--col-6 form_input--text">
              <label>Valeur par défaut</label>
              <input
                type="text"
                value={defaultValue}
                onChange={(e) => setDefaultValue(e.target.value)}
              />
              <p></p>
            </div>
          </div>
          <div className="form_group form_group--options">
            <div className="form_input form_input--col-6 ">
              <label>Options</label>
              <input
                type="text"
                value={optionLabel}
                onChange={(e) => setOptionLabel(e.target.value)}
                placeholder="Titre"
              />
              <p></p>
            </div>
            <div className="form_input">
              <label></label>
              <input
                type="text"
                value={optionValue}
                onChange={(e) => setOptionValue(e.target.value)}
                placeholder="Valeur"
              />
              <p></p>
            </div>
            <button type="button" onClick={addOptionHandler}>
              +
            </button>
          </div>
          <div className="form_group form_group--options_container">
            <div className="form_input form_input--col-12">
              {options.map((option, i) => (
                <span key={i}>{option.label}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="ygrek_form_admin--modal_footer">
          <button onClick={onSaveHandler}>Sauvegarder</button>
          <button
            type="button"
            className="ygrek_form_admin--remove_col_button"
            onClick={onDeleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
