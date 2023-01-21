import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Submission = () => {
  const { data } = useSelector((state) => state.submission);

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <h1>{data.id}</h1>
      <p>Form : {data.id}</p>
      {JSON.parse(data.data).map((input) => (
        <>
          <h4>Title : {input.title}</h4>
          <p>Valeur : {input.value}</p>
        </>
      ))}
    </div>
  );
};

export default Submission;
