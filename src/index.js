// packages
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";

// local files
import "./index.css";
import App from "./App";

/* added the contectprovider inside here so that all the componentes including app.js so that data inside authcontext is now globally scoped
and also added the browserRouter since it should also be present in the whole web app*/
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
