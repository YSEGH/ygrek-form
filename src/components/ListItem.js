import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../actions/actions--app";

const ListItem = ({ form }) => {
  const dispatch = useDispatch();

  const editHandler = (target) => {
    dispatch(setPage({ target: target, id: form.id }));
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="list--item">
      <div className="list--item--header">
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

export default ListItem;
