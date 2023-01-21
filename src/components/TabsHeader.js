import React from "react";
import { useDispatch } from "react-redux";
import { setPage, setParams } from "../actions/action--app";

const TabsHeader = () => {
  const dispatch = useDispatch();

  const onClickHandler = (e, target) => {
    let tabs = document.getElementsByClassName("ygrek_form--tab_button");
    for (let tab of tabs) {
      if (tab.classList.contains("is-active")) {
        tab.classList.remove("is-active");
      }
    }
    e.target.classList.add("is-active");
    dispatch(setParams({ page: target }));
  };
  return (
    <>
      <button
        className="ygrek_form--tab_button"
        onClick={(event) => onClickHandler(event, "liste")}
      >
        Liste
      </button>
      <button
        className="ygrek_form--tab_button"
        onClick={(event) => onClickHandler(event, "ajouter")}
      >
        Ajouter
      </button>
      <button
        className="ygrek_form--tab_button"
        onClick={(event) => onClickHandler(event, "soumissions")}
      >
        Soumissions
      </button>
    </>
  );
};

export default TabsHeader;
