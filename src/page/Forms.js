import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForm } from "../actions/action--form";
import FormListContainer from "../components/FormListContainer";
import Loader from "../components/Loader";

const Forms = () => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(getForm({}, false));
    return () => {};
  }, []);

  return <>{!loading ? <FormListContainer /> : <Loader />}</>;
};

export default Forms;
