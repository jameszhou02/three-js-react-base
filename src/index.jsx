import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Enable debugging in development mode only
if (import.meta.env.DEV) {
  console.log("Three.js React Template - Development Mode");
}
