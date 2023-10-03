import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames, getVideogamesByName } from '../../redux/actions';
import style from './Searchbar.module.css';

export const Searchbar = () => {
  const dispatch = useDispatch();

  // Estado local para almacenar el valor de la búsqueda
  const [name, setName] = useState('');

  // Estado local para controlar el foco en el campo de búsqueda
  const [isFocused, setIsFocused] = useState(false);

  // Maneja el cambio en el campo de búsqueda
  const handleChange = (event) => {
    setName(event.target.value);
  };

  // Realiza la búsqueda al hacer clic en el botón "Search"
  const handleSearch = () => {
    if (!name) {
      // Si el campo está vacío, se obtienen todos los videojuegos
      dispatch(getVideogames());
    } else {
      // Si hay un valor en el campo, se busca por nombre
      dispatch(getVideogamesByName(name));
    }
  };

  // Maneja la pulsación de la tecla Enter en el campo de búsqueda
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Llama a la función de búsqueda cuando se presiona Enter
      handleSearch();
    }
  };

  // Maneja el enfoque en el campo de búsqueda
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Maneja la pérdida de enfoque en el campo de búsqueda
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div className={style.container}>
        {/* Campo de entrada de texto */}
        <input
          type='text'
          value={name}
          // Cambia el marcador de posición del campo según el estado de foco
          placeholder={isFocused ? '' : 'Search'}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
        {/* Botón de búsqueda */}
        <button className={style.search} onClick={handleSearch}>Search</button>
      </div>
    </>
  )
}
