import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForms } from "../actions/actions--form-api";
import FormListContainer from "../components/FormListContainer";
import Loader from "../components/Loader";

const Forms = () => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.getForms);

  useEffect(() => {
    dispatch(getForms({}));
    return () => {};
  }, []);

  return <>{!loading ? <FormListContainer /> : <Loader />}</>;
};

export default Forms;
