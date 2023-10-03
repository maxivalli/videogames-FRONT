import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getGenres,
  filterVideogamesBySource,
  filterVideogamesByGenre,
  sortVideogamesAlphabetically,
  sortVideogamesByRating
} from '../../redux/actions'; // Importamos las acciones de Redux
import style from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch(); // Obtenemos la función `dispatch` de Redux
  const genres = useSelector((state) => state.genres); // Obtenemos la lista de géneros desde el estado global de Redux

  useEffect(() => {
    // Utilizamos useEffect para obtener la lista de géneros cuando el componente se monta
    dispatch(getGenres());
  }, [dispatch]);

  const handleGenresFilter = (event) => {
    // Manejador para filtrar videojuegos por género
    dispatch(filterVideogamesByGenre(event.target.value));
  };

  const handleCreatedFilter = (event) => {
    // Manejador para filtrar videojuegos por origen (API o Base de Datos)
    dispatch(filterVideogamesBySource(event.target.value));
  };

  const handleSortAlphabetically = (event) => {
    // Manejador para ordenar videojuegos alfabéticamente (A-Z o Z-A)
    dispatch(sortVideogamesAlphabetically(event.target.value));
  };

  const handleSortByRating = (event) => {
    // Manejador para ordenar videojuegos por rating (ascendente o descendente)
    dispatch(sortVideogamesByRating(event.target.value));
  };

  return (
    <>
      <div className={style.container}>
        <select onChange={(event) => handleSortAlphabetically(event)} name="Orden">
          <option value='Random'>Orden</option>
          <option value='A'>A-Z</option>
          <option value='Z'>Z-A</option>
        </select>
        <select onChange={(event) => handleSortByRating(event)}>
          <option value='Random'>Rating</option>
          <option value='max'>Descendente</option>
          <option value='min'>Ascendente</option>
        </select>
        <select onChange={(event) => handleGenresFilter(event)} name='genres'>
          <option value='All'>Genre</option>
          {genres.map((genre, index) => (
            // Mapeamos y mostramos opciones de género
            <option key={index} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <select onChange={(event) => handleCreatedFilter(event)}>
          <option value='All'>Origin</option>
          <option value='API'>API</option>
          <option value='created'>DataBase</option>
        </select>
      </div>
    </>
  );
};
