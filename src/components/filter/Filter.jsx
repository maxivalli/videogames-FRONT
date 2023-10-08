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

  const [selectedSortAlphabetically, setSelectedSortAlphabetically] = useState("Random");
  const [selectedGenresFilter, setSelectedGenresFilter] = useState("All");
  const [selectedSortByRating, setSelectedSortByRating] = useState("Random");
  const [selectedCreatedFilter, setSelectedCreatedFilter] = useState("All");

useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);


  const handleGenresFilter = (event) => {
    const selectedValue = event.target.value;
    setSelectedGenresFilter(selectedValue);
    dispatch(filterVideogamesByGenre(selectedValue));
  };

  const handleCreatedFilter = (event) => {
    const selectedValue = event.target.value;
    setSelectedCreatedFilter(selectedValue);
    dispatch(filterVideogamesBySource(selectedValue));
  };

  const handleSortAlphabetically = (event) => {
    const selectedValue = event.target.value;
    setSelectedSortAlphabetically(selectedValue);
    dispatch(sortVideogamesAlphabetically(selectedValue));
  };

  const handleSortByRating = (event) => {
    const selecteValue = event.target.value;
    setSelectedSortByRating(selecteValue);
    dispatch(sortVideogamesByRating(selecteValue));
  };

  //

  const handleClearFilters = () => {
    dispatch(filterVideogamesByGenre("All"));
    setSelectedGenresFilter("All")
    dispatch(filterVideogamesBySource("All"));
    setSelectedCreatedFilter("All")
    dispatch(sortVideogamesAlphabetically("Random"));
    setSelectedSortAlphabetically("Random")
    dispatch(sortVideogamesByRating("Random"));
    setSelectedSortByRating("Random")
  };

  return (
    <>
      <div className={style.container}>
        <button onClick={handleClearFilters}>X</button>
        <select
          onChange={(event) => handleSortAlphabetically(event)}
          name="order"
          value={selectedSortAlphabetically}
        >
          <option value="Random">Order</option>
          <option value="A">A to Z</option>
          <option value="Z">Z to A</option>
        </select>
        <select
          onChange={(event) => handleSortByRating(event)}
          name="rating"
          value={selectedSortByRating}
        >
          <option value="Random">Rating</option>
          <option value="max">High to low</option>
          <option value="min">Low to high</option>
        </select>
        <select
          onChange={(event) => handleGenresFilter(event)}
          name="genres"
          value={selectedGenresFilter}
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
          name="created"
          value={selectedCreatedFilter}
        >
          <option value="All">Origin</option>
          <option value="API">API</option>
          <option value="created">DataBase</option>
        </select>
      </div>
    </>
  );
};
