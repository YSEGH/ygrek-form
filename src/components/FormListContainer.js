import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FormListItem from "./FormListItem";

const FormListContainer = () => {
  const { forms } = useSelector((state) => state.form);

  useEffect(() => {
    return () => {};
  }, [forms]);

  return (
    <div className="list--container">
      {forms.map((form) => (
        <FormListItem key={form.id} form={form} />
      ))}
    </div>
  );
};

export default FormListContainer;
