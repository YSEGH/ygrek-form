import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import TabsHeader from "./components/TabsHeader";

export const App = () => {
  const [page, setPage] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("page");
    setPage(page);
    return () => {};
  }, []);

  const changePageHandler = (target) => {
    window.history.pushState(
      {
        page: target,
      },
      target.charAt(0).toUpperCase(),
      `?page=ygrek-form-${target}`
    );
    setPage(`ygrek-form-${target}`);
  };

  return (
    <>
      <TabsHeader changePageHandler={changePageHandler} />
      {page == "ygrek-form-ajouter" ? (
        <Form />
      ) : page == "ygrek-form-liste" ? (
        <h1>Liste</h1>
      ) : page == "ygrek-form-soumissions" ? (
        <h1>Soumissions</h1>
      ) : (
        <div></div>
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
