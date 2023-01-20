import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setParams } from "../actions/actions--app";

const FormListItem = ({ form }) => {
  const dispatch = useDispatch();

  const editHandler = (target) => {
    dispatch(setParams({ page: target, id: form.id }));
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="list--item">
      <div className="list--item--header">
        <h1>{form.id}</h1>
        <h1>{form.form_title}</h1>
      </div>
      <div className="list--item--footer">
        <button>Soumissions</button>
        <button onClick={() => editHandler("ajouter")}>Modifier</button>
        <button>Supprimer</button>
      </div>
    </div>
  );
};

export default FormListItem;
