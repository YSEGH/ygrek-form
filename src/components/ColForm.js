import React from "react";
import { useDispatch } from "react-redux";
import { updateCol } from "../actions/actions";

const ColForm = ({ col }) => {
  const dispatch = useDispatch();

  const onChangeHandler = (property, value) => {
    let values = {};
    // Récupération du type d'input
    if (property == "field") {
      values = getFieldType(value);
    }
    if (property == "required") {
      values["required"] = value;
    }
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
    values["field"] = type;
    switch (type) {
      case "nom":
      case "prenom":
      case "texte_court":
        values["html_element"] = "input";
        values["input_type"] = "text";
        break;
      case "liste":
        values["html_element"] = "select";
        break;
      case "telephone":
        values["html_element"] = "input";
        values["input_type"] = "tel";
        break;
      case "email":
        values["html_element"] = "input";
        values["input_type"] = "email";
        break;
      case "case_a_cocher":
        values["html_element"] = "input";
        values["input_type"] = "checkbox";
        break;
      case "radio":
        values["html_element"] = "input";
        values["input_type"] = "radio";
        break;
      case "texte_long":
        values["html_element"] = "textarea";
        break;
      default:
        break;
    }
    return values;
  };
  return (
    <div className="ygrek_form_admin--col_form">
      <div className="form_input form_input--select">
        <label>Type</label>
        <select
          defaultValue={"vide"}
          onChange={(e) => onChangeHandler("field", e.target.value)}
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
      </div>
      <div className="form_input form_input--checkbox">
        <label>Requis ? </label>
        <input
          type={"checkbox"}
          onChange={(e) => onChangeHandler("required", e.target.checked)}
        />
      </div>
    </div>
  );
};

export default ColForm;
