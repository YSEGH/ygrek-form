import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormById } from "./actions/actions--api";
import { setPage } from "./actions/actions--app";
import Form from "./components/Form";
import Liste from "./components/Liste";
import TabsHeader from "./components/TabsHeader";

export const App = () => {
  const { page } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const param_id = urlParams.get("id");
    const param_page = urlParams.get("page");
    let params = { target: param_page.split("-")[2] };
    if (param_id) {
      let conditions = {
        id: param_id,
      };
      dispatch(getFormById({ conditions: conditions }));
      params = { ...params, id: param_id };
    }
    if (page !== params.target) {
      dispatch(setPage(params));
    }
    return () => {};
  }, [page]);

  return (
    <>
      <TabsHeader />
      {page == "ajouter" ? (
        <Form />
      ) : page == "liste" ? (
        <Liste />
      ) : page == "soumissions" ? (
        <h1>Soumissions</h1>
      ) : (
        <div>
          <h1>Cette page n'existe pas.</h1>
        </div>
      )}
    </>
  );
};

export default App;

/* 
page == "ygrek-form-ajouter" ? (
    <h1>Ajouter</h1>
  ) : page == "ygrek-form-liste" ? (
    <h1>Liste</h1>
  ) : page == "ygrek-form-soumissions" ? (
    <h1>Soumissions</h1>
  ) : (
    <div></div>
  );
*/
