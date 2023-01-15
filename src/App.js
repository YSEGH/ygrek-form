import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParams } from "./actions/actions--app";
import TabsHeader from "./components/TabsHeader";
import Form from "./page/Form";
import List from "./page/List";

export const App = () => {
  const {
    params: { param_page },
  } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setParams());
    return () => {};
  }, []);

  useEffect(() => {
    return () => {};
  }, [param_page]);

  return (
    <>
      <TabsHeader />
      {param_page == "ajouter" ? (
        <Form />
      ) : param_page == "liste" ? (
        <List />
      ) : param_page == "soumissions" ? (
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
