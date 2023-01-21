import React from "react";
import { useDispatch } from "react-redux";
import { setParams } from "../actions/action--app";
import { deleteForm } from "../actions/action--form";

const FormListItem = ({ form }) => {
  const dispatch = useDispatch();

  const editHandler = (target) => {
    dispatch(setParams({ page: target, id: form.id }));
  };

  const deleteHandler = () => {
    dispatch(deleteForm({ id: form.id }));
  };

  return (
    <div className="list--item">
      <div className="list--item--header">
        <h1>{form.id}</h1>
        <h1>{form.form_title}</h1>
      </div>
      <div className="list--item--footer">
        <button>Soumissions</button>
        <button onClick={() => editHandler("ajouter")}>Modifier</button>
        <button onClick={() => deleteHandler()}>Supprimer</button>
      </div>
    </div>
  );
};

export default FormListItem;
