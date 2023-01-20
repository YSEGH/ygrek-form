import React from "react";
import { useSelector } from "react-redux";
import SubmissionListItem from "./SubmissionListItem";

const SubmissionListContainer = () => {
  const { submissions } = useSelector((state) => state.getSubmission);
  return (
    <div>
      {submissions.map((submission) => (
        <SubmissionListItem submission={submission} key={submission.id} />
      ))}
    </div>
  );
};

export default SubmissionListContainer;
