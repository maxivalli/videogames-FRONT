// Importamos React y las bibliotecas necesarias
import React from "react";
import { HashRouter } from "react-router-dom"; // Permite el enrutamiento en una aplicación React utilizando URLs hash
import { createRoot } from "react-dom/client"; // Utilizado para renderizar la aplicación React en el DOM
import { Provider } from "react-redux"; // Proporciona acceso global al estado de Redux
import store from "./redux/store"; // Importamos la configuración de la tienda Redux
import App from "./App.jsx"; // Importamos el componente principal de la aplicación
import "./main.css"; // Importamos estilos CSS

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

// Renderizamos la aplicación en el elemento con ID "root" en el DOM
root.render(
  // Usamos el componente Provider de Redux para proporcionar el estado de la tienda a la aplicación
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
