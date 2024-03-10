import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// css
import "./index.css";
// react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      theme="colored"
    />
  </>
);
