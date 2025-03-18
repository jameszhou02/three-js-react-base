import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Enable debugging in development mode only
if (process.env.NODE_ENV === "development") {
  console.log("Three.js React Template - Development Mode");
}
