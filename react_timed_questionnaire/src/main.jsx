import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode to execute code twice and catch errors easier
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
