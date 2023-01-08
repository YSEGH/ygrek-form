import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForm } from "../actions/actions--api";
import ListItem from "./ListItem";

const Liste = () => {
  const { data, success, error, loading } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForm({}));
    return () => {};
  }, []);

  return (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : (
        data.map((form) => <ListItem key={form.form_id} form={form} />)
      )}
    </div>
  );
};

export default Liste;
