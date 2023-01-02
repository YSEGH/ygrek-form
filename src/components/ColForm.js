import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCol } from "../actions/actions";
import { v4 as uuid } from "uuid";

const ColForm = ({ col }) => {
  const dispatch = useDispatch();

  const onChangeHandler = (property, value) => {
    let values = {};
    // Récupération du type d'input
    if (property === "input") {
      values = getFieldType(value);
      values["for"] = `${values["input"]}-${uuid()}`;
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

  useEffect(() => {
    return () => {};
  }, [col]);

  return (
    <div className="ygrek_form_admin--col_form form_group">
      {/* <div className="form_input form_input--select">
        <label>Type</label>
        <select
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
      </div> */}
      {col.input !== "vide" && (
        <div className="form_input form_input--checkbox">
          <label>Requis ?</label>
          <input
            type={"checkbox"}
            defaultChecked={col.required}
            onChange={(e) => onChangeHandler("required", e.target.checked)}
          />
        </div>
      )}
    </div>
  );
};

export default ColForm;
