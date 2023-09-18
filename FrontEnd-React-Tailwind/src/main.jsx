import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PropertiesProvider } from "../src/context/propertiesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PropertiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PropertiesProvider>
  </React.StrictMode>
);
