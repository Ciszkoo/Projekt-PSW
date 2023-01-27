import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);
