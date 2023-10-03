// Importamos React y las bibliotecas necesarias
import React from "react";
import axios from "axios"; // Importamos Axios para hacer solicitudes HTTP
import { Routes, Route } from "react-router-dom"; // Importamos Routes y Route de react-router-dom para manejar las rutas
import { Home } from "./views/home/Home"; // Importamos el componente Home
import { Create } from "./views/create/Create"; // Importamos el componente Create
import { Landing } from "./views/landin/Landing"; // Importamos el componente Landing
import { Detail } from "./views/datail/Detail"; // Importamos el componente Detail
import { About } from "./views/about/About"; // Importamos el componente About
import "./App.css"; // Importamos estilos CSS

// Configuramos la URL base para las solicitudes HTTP con Axios
axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  return (
    <>
      {/* Definimos las rutas de la aplicación */}
      <Routes>
        {/* Ruta para la landing page */}
        <Route path="/" element={<Landing />} />

        {/* Ruta para la página de inicio */}
        <Route path="/home" element={<Home />} />

        {/* Ruta para la página de creación */}
        <Route path="/create" element={<Create />} />

        {/* Ruta para la página de detalle con un parámetro dinámico ":id" */}
        <Route path="/detail/:id" element={<Detail />} />

        {/* Ruta para la página "Acerca de" */}
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
