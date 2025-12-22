import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import AdminApp from "./admin/AdminApp.jsx";

import "./index.css";
import "./styles/global.css";

const isAdminRoute = window.location.pathname.startsWith("/admin");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {isAdminRoute ? <AdminApp /> : <App />}
    </BrowserRouter>
  </React.StrictMode>
);
