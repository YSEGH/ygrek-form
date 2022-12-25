import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

document.addEventListener("DOMContentLoaded", () => {
  const root = ReactDOM.createRoot(
    document.getElementById("ygrek-form-react-root")
  );
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
