// Importamos las bibliotecas y componentes necesarios.
import React from "react";
import { Pagination } from "../pagination/Pagination";
import { useState, useEffect } from "react";
import { getVideogames } from "../../redux/actions";
import { Card } from "../card/Card";
import Gif from "../../assets/gif.gif"
import style from "./Cards.module.css";
import { useSelector, useDispatch } from "react-redux";

export const Cards = () => {
  // Obtenemos el objeto "dispatch" para despachar acciones Redux.
  const dispatch = useDispatch();

  // Utilizamos el selector para obtener el estado de "videogames" desde Redux.
  const allVideogames = useSelector((state) => state.videogames);

  // Estado local para gestionar el tiempo de espera.
  const [hasTimedOut, setHasTimedOut] = useState(false);

  // Estado local para gestionar la página actual de la paginación.
  const [currentPage, setCurrentPage] = useState(1);
  const videogamesPerPage = 15;

  // Calculamos los índices de los primeros y últimos juegos a mostrar en la página actual.
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

  // Extraemos los juegos a mostrar en la página actual utilizando "slice".
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  // Función para cambiar la página actual.
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Efecto secundario para obtener los datos de los videojuegos al cargar el componente.
  useEffect(() => {
    dispatch(getVideogames()); // Despachamos la acción para obtener los datos.
  }, [dispatch]);

  // Efecto secundario para gestionar el tiempo de espera si no se obtienen datos.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (allVideogames.length === 0) {
        setHasTimedOut(true); // Establecemos "hasTimedOut" en true si no se obtienen datos en 10 segundos.
      }
    }, 10000); // Esperamos 10 segundos antes de considerarlo un tiempo de espera.

    // Limpiamos el temporizador si el componente se desmonta antes de que se cumpla el tiempo.
    return () => clearTimeout(timer);
  }, [allVideogames]);

  // Renderizamos diferentes elementos según el estado de los datos.
  if (!allVideogames || allVideogames.length === 0) {
    if (hasTimedOut) {
      return <h2>Error al obtener los datos</h2>; // Se muestra si ha habido un tiempo de espera.
    } else {
      return <img src={Gif} className={style.gif}></img>; // Se muestra durante la carga de datos.
    }
  }

  // Renderizamos la lista de tarjetas de videojuegos y la paginación.
  return (
    <>
      <div className={style.container}>
        {/* Componente de paginación */}
        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          currentPage={currentPage}
          pagination={pagination}
        />

        {/* Mapeamos y mostramos tarjetas de videojuegos */}
        {currentVideogames.map((videogame) => (
          <Card
            key={videogame.id}
            id={videogame.id}
            name={videogame.name}
            image={videogame.image}
            genres={videogame.genres.join(", ")}
            platforms={videogame.platforms.join(", ")}
            rating={videogame.rating}
          />
        ))}
      </div>
    </>
  );
};
