import React from "react";
import { useSelector } from "react-redux";
import FormListItem from "./FormListItem";

const FormListContainer = () => {
  const { forms } = useSelector((state) => state.getForms);
  return (
    <div className="list--container">
      {forms.map((form) => (
        <FormListItem key={form.form_id} form={form} />
      ))}
    </div>
  );
};

export default FormListContainer;
