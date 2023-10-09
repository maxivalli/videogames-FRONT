import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideogame, clearVideogameDetail } from "../../redux/actions";
import style from "./Detail.module.css";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideogame(id)); // Obtiene el videogame por ID
    return () => {
      dispatch(clearVideogameDetail()); // Limpia el estado
    };
  }, [dispatch, id]);

  const videogame = useSelector((state) => state.detail);

  // Renderiza un mensaje mientras respone la API
  
  if (!videogame || videogame.length === 0) { 
    return (
      <>
        <h2 className={style.loading}>Loading...</h2>; 
      </>
    );
  }

  return (
    <>
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
