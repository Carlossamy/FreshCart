import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { Provider } from "react-redux";
// import store from "./Redux/reduxStore.js";

//! These are the links that should be injected into the component, to use with it within the component!
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  //* ReactDOM is responsible for rendering React components into the DOM.
  //* StrictMode is a tool for highlighting potential problems in an application.
  <StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </StrictMode>
);

/**
 * @fileoverview //* Entry point for the React application!
 ** This file sets up the React application by importing necessary dependencies,
 ** including CSS and JS files, and rendering the root component!
 *
 *? Dependencies:
 ** - React and ReactDOM for rendering the application.
 ** - Bootstrap CSS and JS for styling and UI components.
 ** - FontAwesome for icons.
 
 * @module main
 */
