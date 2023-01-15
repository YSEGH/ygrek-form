import React from "react";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";

const ListContainer = () => {
  const { data } = useSelector((state) => state.getForms);
  return (
    <div className="list--container">
      {data.map((form) => (
        <ListItem key={form.form_id} form={form} />
      ))}
    </div>
  );
};

export default ListContainer;
