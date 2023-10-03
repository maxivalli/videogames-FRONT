import React from "react";
import { Navbar } from "../../components/navbar/Navbar";
import style from "./About.module.css";

export const About = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className={style.header}>
        <h1>About</h1>
      </div>
      <div className={style.container}>
        <div>
          <h2>Sobre la aplicación...</h2>
        </div>
        <div className={style.description}>
          <p>
            Esta es una SPA que utiliza las tecnologías: React, Redux, Node,
            Express y Sequelize.
            <br />
            Fue hecha con la finalidad de poner en práctica recursos básicos de
            estilos y diseño (UX : UI)
            <br />
            Afirmar y conectar los conceptos aprendidos en la carrera y aprender
            mejores prácticas.
            <br />
            Aprender y practicar el workflow de GIT.
            <br />
            <br/>
            La idea de este proyecto fue construir una aplicación web a partir de
            la API rawg en la que se pueda:
            <br />
            Buscar videojuegos. Visualizar la información de los videojuegos.
            <br />
            Filtrarlos. Ordenarlos. Crear nuevos videojuegos.
          </p>
        </div>
      </div>
    </>
  );
};
