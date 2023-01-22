import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setParams } from "../actions/action--app";

const SubmissionListItem = ({ submission }) => {
  /*   const [data, setData] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
 */ let dateFormat = new Date(parseInt(submission.timestamp));

  const onClickHandler = (e) => {
    console.log(e.target, e.target.classList.contains("is_active"));
    if (e.target.classList.contains("is_active")) {
      e.target.classList.remove("is_active");
      return;
    }
    e.target.classList.add("is_active");
  };

  useEffect(() => {
    let data_decode = JSON.parse(submission.data);
    setData(data_decode.filter((input) => input.type !== "checkbox"));
    /* Initialise */
    data_decode.map((input) =>
      input.type === "checkbox" ? setCheckbox(checkbox.push(input)) : input
    );
    console.log(data_decode);
    return () => {};
  }, []);
  return (
    <div className="submission-list--item" onClick={onClickHandler}>
      <div className="submission-list--item-header">
        <h2>
          {submission.form_title} <span>({submission.form_id})</span>
        </h2>
        <h4>
          {dateFormat.getDate()}/
          {dateFormat.getMonth() + 1 < 10
            ? "0" + (dateFormat.getMonth() + 1)
            : dateFormat.getMonth() + 1}
          /{dateFormat.getFullYear()}
        </h4>
      </div>
      <div className="submission-list--item-content">
        {data.map((input, i) => (
          <div className="item-content--input" key={i}>
            <h4>{input.title}</h4>
            <p>{input.value}</p>
          </div>
        ))}
        {checkbox.length > 0 && (
          <div className="item-content--input checkbox">
            <h1>{}</h1>
            {checkbox.map((item) => (
              <div></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionListItem;
