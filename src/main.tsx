import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app/app";
import "./index.css";
import { Provider } from "react-redux";
import { appStore } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
