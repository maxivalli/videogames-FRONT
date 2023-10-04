import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getGenres,
  filterVideogamesBySource,
  filterVideogamesByGenre,
  sortVideogamesAlphabetically,
  sortVideogamesByRating,
} from "../../redux/actions";
import style from "./Filter.module.css";

export const Filter = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  // Obtener los valores iniciales de los filtros del localStorage
  const initialSelectedGenre = localStorage.getItem("selectedGenre") || "All";
  const initialSelectedSource = localStorage.getItem("selectedSource") || "All";
  const initialSelectedAlphabeticalOrder =
    localStorage.getItem("selectedAlphabeticalOrder") || "Random";
  const initialSelectedRatingOrder =
    localStorage.getItem("selectedRatingOrder") || "Random";

  // Estados locales para los filtros
  const [selectedGenre, setSelectedGenre] = useState(initialSelectedGenre);
  const [selectedSource, setSelectedSource] = useState(initialSelectedSource);
  const [selectedAlphabeticalOrder, setSelectedAlphabeticalOrder] = useState(
    initialSelectedAlphabeticalOrder
  );
  const [selectedRatingOrder, setSelectedRatingOrder] = useState(
    initialSelectedRatingOrder
  );

  // Actualizar los valores de los filtros en el localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
  }, [selectedGenre]);

  useEffect(() => {
    localStorage.setItem("selectedSource", selectedSource);
  }, [selectedSource]);

  useEffect(() => {
    localStorage.setItem(
      "selectedAlphabeticalOrder",
      selectedAlphabeticalOrder
    );
  }, [selectedAlphabeticalOrder]);

  useEffect(() => {
    localStorage.setItem("selectedRatingOrder", selectedRatingOrder);
  }, [selectedRatingOrder]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  //

  const handleGenresFilter = (event) => {
    setSelectedGenre(event.target.value);
    dispatch(filterVideogamesByGenre(event.target.value));
  };

  const handleCreatedFilter = (event) => {
    setSelectedSource(event.target.value);
    dispatch(filterVideogamesBySource(event.target.value));
  };

  const handleSortAlphabetically = (event) => {
    setSelectedAlphabeticalOrder(event.target.value);
    dispatch(sortVideogamesAlphabetically(event.target.value));
  };

  const handleSortByRating = (event) => {
    setSelectedRatingOrder(event.target.value);
    dispatch(sortVideogamesByRating(event.target.value));
  };

  //

  const handleClearFilters = () => {
    setSelectedGenre("All");
    setSelectedSource("All");
    setSelectedAlphabeticalOrder("Random");
    setSelectedRatingOrder("Random");

    dispatch(filterVideogamesByGenre("All"));
    dispatch(filterVideogamesBySource("All"));
    dispatch(sortVideogamesAlphabetically("Random"));
    dispatch(sortVideogamesByRating("Random"));
  };

  return (
    <>
      <div className={style.container}>
        <button onClick={handleClearFilters}>X</button>
        <select
          onChange={(event) => handleSortAlphabetically(event)}
          name="Orden"
          value={selectedAlphabeticalOrder}
        >
          <option value="Random">Orden</option>
          <option value="A">A-Z</option>
          <option value="Z">Z-A</option>
        </select>
        <select
          onChange={(event) => handleSortByRating(event)}
          value={selectedRatingOrder}
        >
          <option value="Random">Rating</option>
          <option value="max">Descendente</option>
          <option value="min">Ascendente</option>
        </select>
        <select
          onChange={(event) => handleGenresFilter(event)}
          name="genres"
          value={selectedGenre}
        >
          <option value="All">Genre</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <select
          onChange={(event) => handleCreatedFilter(event)}
          value={selectedSource}
        >
          <option value="All">Origin</option>
          <option value="API">API</option>
          <option value="created">DataBase</option>
        </select>
      </div>
    </>
  );
};
