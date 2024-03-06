import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import PublicProvider from "./providers/PublicProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PublicProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
        <ToastContainer />
      </AuthProvider>
    </PublicProvider>
  </React.StrictMode>
);
