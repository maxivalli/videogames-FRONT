import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideogame, clearVideogameDetail } from "../../redux/actions"; // Importamos la acción para obtener detalles de videojuegos
import { Navbar } from "../../components/navbar/Navbar"; // Importamos el componente Navbar
import style from "./Detail.module.css";
import { useParams } from "react-router-dom"; // Importamos useParams para obtener el parámetro de la URL

export const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Obtenemos el parámetro "id" de la URL

  useEffect(() => {
    // Utilizamos useEffect para disparar la acción de obtener detalles de videojuegos cuando el componente se monta o cuando el "id" cambia
    dispatch(getVideogame(id));
    return () => {
      // Función de limpieza: se ejecuta cuando el componente se desmonta
      dispatch(clearVideogameDetail());
    };
  }, [dispatch, id]);

  const videogame = useSelector((state) => state.detail); // Obtenemos el estado del detalle del videojuego desde Redux

  if (!videogame || videogame.length === 0) {
    // Si no hay datos de videojuego en el estado o la longitud es cero, mostramos un mensaje de carga
    return (
      <>
        <Navbar /> {/* Mostramos el componente Navbar */}
        <h2 className={style.loading}>Loading...</h2>;
      </>
    );
  }

  // Si hay datos de videojuego en el estado, mostramos los detalles
  return (
    <>
      <Navbar /> {/* Mostramos el componente Navbar */}
      <div className={style.header}>
        <h1>Detail</h1>
      </div>
      <div className={style.container}>
        <h2 className={style.name}>{videogame[0].name}</h2>
        <img src={videogame[0].image} className={style.image}></img>
        <h3 className={style.text}>
          <span className={style.title}>Platforms: </span>
          <span>{videogame[0].platforms.join(", ")}</span>
        </h3>
        <h3 className={style.text}>
          <span className={style.title}>Genres: </span>
          <span>{videogame[0].genres.join(", ")}</span>
        </h3>
        <h3 className={style.text}>
          <span className={style.title}>Relased: </span>
          <span>{videogame[0].released}</span>
        </h3>
        <h3 className={style.text}>
          <span className={style.title}>Rating: </span>
          <span>{videogame[0].rating}</span>
        </h3>
        <div className={style.description}>
          <h3 className={style.text}>
            <span className={style.title}>Description: </span>
            <span
              dangerouslySetInnerHTML={{ __html: videogame[0].description }}
            ></span>
          </h3>
        </div>
      </div>
    </>
  );
};
