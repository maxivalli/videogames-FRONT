import React from "react";
import { Pagination } from "../pagination/Pagination";
import { useState, useEffect } from "react";
import { getVideogames, setHasLoadedVideogames } from "../../redux/actions";
import { Card } from "../card/Card";
import Gif from "../../assets/gif.gif";
import style from "./Cards.module.css";
import { useSelector, useDispatch } from "react-redux";

export const Cards = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const hasLoadedVideogames = useSelector((state) => state.hasLoadedVideogames);

  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  //PAGINADO

  const videogamesPerPage = 15;
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // CARGA VIDEOJUEGOS

  useEffect(() => {
    if (!hasLoadedVideogames) {
      dispatch(getVideogames());
      dispatch(setHasLoadedVideogames(true)); 
    }
  }, [dispatch, hasLoadedVideogames]);

  //

  useEffect(() => {
    const timer = setTimeout(() => {
      if (allVideogames.length === 0) {
        setHasTimedOut(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [allVideogames]);

  if (!allVideogames || allVideogames.length === 0) {
    if (hasTimedOut) {
      return <h2>No se pudieron obtener datos</h2>;
    } else {
      return <img src={Gif} className={style.gif}></img>;
    }
  }

  return (
    <>
      <div className={style.container}>
        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          currentPage={currentPage}
          pagination={pagination}
        />

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
