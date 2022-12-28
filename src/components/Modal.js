import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../actions/actions";

const Modal = ({ col }) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(closeModal({}));
  };
  return (
    <div className="ygrek_form_admin--modal_overlay">
      <div className="ygrek_form_admin--modal_content">
        Modal - {col.col_id}
        <button onClick={onClickHandler}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;
