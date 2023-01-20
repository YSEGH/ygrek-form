import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubmission } from "../actions/actions--submission-api";
import Loader from "../components/Loader";
import SubmissionListContainer from "../components/SubmissionListContainer";
import SubmissionListFilter from "../components/SubmissionListFilter";

const Submissions = () => {
  const dispatch = useDispatch();
  const { loading, error, success, submissions } = useSelector(
    (state) => state.getSubmission
  );

  useEffect(() => {
    if (submissions.length() === 0) {
      dispatch(getSubmission([]));
    }
    return () => {};
  }, []);

  return (
    <>
      <h1>Soumissions</h1>
      <SubmissionListFilter />
      {!loading ? <SubmissionListContainer /> : <Loader />}
    </>
  );
};

export default Submissions;
