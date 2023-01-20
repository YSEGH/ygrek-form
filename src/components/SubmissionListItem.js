import React from "react";
import { useDispatch } from "react-redux";
import { setParams } from "../actions/actions--app";

const SubmissionListItem = ({ submission }) => {
  const dispatch = useDispatch();

  const onClickHandler = (target) => {
    dispatch(setParams({ page: target, id: submission.id }));
  };
  return (
    <div>
      <h1>{submission.id}</h1>
      <p>{submission.form_id}</p>
      <p>{submission.timestamp}</p>
      <div>
        {JSON.parse(submission.data).map((input) => (
          <>
            <h4>Title : {input.title}</h4>
            <p>Valeur : {input.value}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default SubmissionListItem;
