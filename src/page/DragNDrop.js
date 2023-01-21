import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DragNDropForm from "../components/DragNDropForm";
import DragNDropDetails from "../components/DragNDropDetails";
import Loader from "../components/Loader";
import { getForm } from "../actions/action--form";
import { resetForm } from "../actions/action--dragNDropForm";

const DragNDrop = () => {
  const dispatch = useDispatch();
  const {
    params: { param_id },
  } = useSelector((state) => state.app);

  const { loading, error, success } = useSelector((state) => state.form);

  useEffect(() => {
    if (param_id) {
      dispatch(getForm({ id: param_id }, true));
    }
    return () => {
      dispatch(resetForm());
    };
  }, [param_id]);

  return (
    <>
      <div className="page--form">
        <div className="form-details--container">
          <DragNDropDetails />
        </div>
        <div className="form-drag-n-drop--container">
          <DragNDropForm />
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default DragNDrop;
