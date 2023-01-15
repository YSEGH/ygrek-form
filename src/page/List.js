import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForms } from "../actions/actions--api";
import ListContainer from "../components/ListContainer";
import Loader from "../components/Loader";

const List = () => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.getForms);

  useEffect(() => {
    dispatch(getForms({}));
    return () => {};
  }, []);

  return <>{!loading ? <ListContainer /> : <Loader />}</>;
};

export default List;
