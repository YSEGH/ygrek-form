import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForm } from "../actions/actions--api";
import { resetForm } from "../actions/actions--form";
import DragNDropForm from "../components/DragNDropForm";
import FormInfos from "../components/FormInfos";
import Loader from "../components/Loader";

const Form = () => {
  const dispatch = useDispatch();
  const {
    params: { param_id },
  } = useSelector((state) => state.app);

  const { loading, error, success } = useSelector((state) => state.getForm);

  useEffect(() => {
    if (param_id) {
      dispatch(getForm({ conditions: { id: param_id } }));
    } else {
      dispatch(resetForm());
    }
    return () => {};
  }, [param_id]);

  return (
    <>
      {!loading ? (
        <div className="page--form">
          <div className="form-details--container">
            <FormInfos />
          </div>
          <div className="form-drag-n-drop--container">
            <DragNDropForm />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Form;
