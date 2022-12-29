import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../actions/actions";

const Modal = ({ col }) => {
  const [className, setClassName] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [label, setLabel] = useState("");
  const [defaut, setDefaut] = useState("");
  const [optionLabel, setOptionLabel] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(closeModal({}));
  };
  return (
    <div className="ygrek_form_admin--modal_overlay">
      <div className="ygrek_form_admin--modal_content">
        <div className="ygrek_form_admin--modal_header">
          <h6>
            {col.field} - <span>{col.html_element}</span>
          </h6>
          <button onClick={onClickHandler}>Fermer</button>
        </div>
        <div className="ygrek_form_admin--form_container">
          <div className="form_group">
            <div className="form_input form_input--text">
              <label>Libellé</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="form_input form_input--text">
              <label>Placeholder</label>
              <input
                type="text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </div>
          </div>
          <div className="form_group">
            <div className="form_input form_input--text">
              <label>Classes CSS additionnelles</label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>
            <div className="form_input form_input--text">
              <label>Valeur par défaut</label>
              <input
                type="text"
                value={defaut}
                onChange={(e) => setDefaut(e.target.value)}
              />
            </div>
          </div>
          <div className="form_group">
            <div className="form_input form_input--option_label">
              <label>Options</label>
              <input
                type="text"
                value={optionLabel}
                onChange={(e) => setOptionLabel(e.target.value)}
                placeholder="Titre"
              />
            </div>
            <div className="form_input form_input--option_value">
              <input
                type="text"
                value={optionValue}
                onChange={(e) => setOptionValue(e.target.value)}
                placeholder="Valeur"
              />
              <button type="button">+</button>
            </div>
          </div>
          <div className="form_group">
            <div className="form_input--options_container">
              {col.options.map((option, i) => (
                <span key={i}>{option}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
