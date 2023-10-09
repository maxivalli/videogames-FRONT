
import React from "react";
import { HashRouter } from "react-router-dom"; 
import { createRoot } from "react-dom/client"; 
import { Provider } from "react-redux";
import store from "./redux/store"; 
import App from "./App.jsx"; 
import "./main.css"; 

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
