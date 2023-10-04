import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME,
  CLEAR_VIDEOGAME,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  POST_VIDEOGAME,
  FILTER_BY_GENRE,
  FILTER_BY_SOURCE,
  SORT_ALPHABETICALLY,
  SORT_BY_RATING,
} from "./actions"; // Importamos las constantes de las acciones definidas

const initialState = {
  videogames: [], // Almacena la lista de videojuegos
  allVideogames: [], // Almacena todos los videojuegos sin filtrar
  detail: [], // Almacena detalles de un videojuego
  genres: [], // Almacena la lista de géneros de videojuegos
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      // Actualizamos el estado con la lista de videojuegos y la lista completa de videojuegos
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case GET_VIDEOGAME:
      // Actualizamos el estado con los detalles de un videojuego
      return { ...state, detail: action.payload };

    case CLEAR_VIDEOGAME:
      //Limpia el estado con los detalles del videogame
      return { ...state, detail: null };

    case GET_VIDEOGAMES_BY_NAME:
      // Actualizamos el estado con la lista de videojuegos filtrada por nombre
      return { ...state, videogames: action.payload };

    case GET_GENRES:
      // Actualizamos el estado con la lista de géneros de videojuegos
      return { ...state, genres: action.payload };

    case POST_VIDEOGAME:
      // No se realiza ninguna actualización de estado para la acción de creación de videojuegos
      return { ...state };

    case FILTER_BY_GENRE:
      // Filtramos la lista de videojuegos por género
      const allVideogames = state.allVideogames;
      const filteredVideogames =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((videogame) =>
              videogame.genres.includes(action.payload)
            );
      return { ...state, videogames: filteredVideogames };

    case FILTER_BY_SOURCE:
      // Filtramos la lista de videojuegos por fuente (creados o no creados)
      const createdFilter =
        action.payload === "created"
          ? state.allVideogames.filter((videogame) => videogame.created)
          : state.allVideogames.filter((videogame) => !videogame.created);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : createdFilter,
      };

    case SORT_ALPHABETICALLY:
      // Ordenamos la lista de videojuegos alfabéticamente (ascendente o descendente)
      let sortedAlphabetically;
      if (action.payload === "A") {
        sortedAlphabetically = state.videogames.slice().sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      } else {
        sortedAlphabetically = state.videogames.slice().sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
      return {
        ...state,
        videogames:
          action.payload === "Random" ? state.videogames : sortedAlphabetically,
      };

    case SORT_BY_RATING:
      // Ordenamos la lista de videojuegos por rating (máximo o mínimo)
      const allVideogamesCopy = [...state.videogames];
      const sortedByRating =
        action.payload === "max"
          ? allVideogamesCopy.sort((a, b) => b.rating - a.rating)
          : allVideogamesCopy.sort((a, b) => a.rating - b.rating);
      return {
        ...state,
        videogames:
          action.payload === "Random" ? state.videogames : sortedByRating,
      };

    default:
      // Devolvemos el estado sin cambios si no coincide con ninguna acción
      return state;
  }
};

export default rootReducer;
