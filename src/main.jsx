import React from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./main.css";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientID}
    authorizationParams={{
      redirect_uri: "http://localhost:5173/videogames-FRONT/#/home"
    }}
  >
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </Auth0Provider>
);

// http://localhost:5173/videogames-FRONT/#/home
// https://maxivalli.github.io/videogames-FRONT/#/home