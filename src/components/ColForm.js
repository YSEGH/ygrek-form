import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { updateCol } from "../actions/actions";
import {v4 as uuid} from "uuid";

const ColForm = ({ col }) => {
  const dispatch = useDispatch();

  const onChangeHandler = (property, value) => {
    let values = {};
    // Récupération du type d'input
    if (property === "input") {
      values = getFieldType(value);
      values['for'] = `${values["input"]}-${uuid()}`
    }
    if (property === "required") {
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

  useEffect(() => {
    return () => {};
  }, [col]);

  return (
    <div className="ygrek_form_admin--col_form form_group">
      <div className="form_input form_input--select">
        <label
          // onDragEnter={(e) => e.preventDefault()}
          // onDragOver={(e) => e.preventDefault()}
        >
          Type
        </label>
        <select
          // onDragEnter={(e) => e.preventDefault()}
          // onDragOver={(e) => e.preventDefault()}
          defaultValue={col.input}
          onChange={(e) => onChangeHandler("input", e.target.value)}
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
      {
        col.input !== "vide" &&
        <div className="form_input form_input--checkbox">
          <label
              // onDragEnter={(e) => e.preventDefault()}
              // onDragOver={(e) => e.preventDefault()}
          >Requis ? </label>
          <input
              // onDragEnter={(e) => e.preventDefault()}
              // onDragOver={(e) => e.preventDefault()}
              type={"checkbox"}
              defaultChecked={col.required}
              onChange={(e) => onChangeHandler("required", e.target.checked)}
          />
        </div>
      }
    </div>
  );
};

export default ColForm;
