import axios from "axios";

// Definimos una URL base para las solicitudes HTTP
const URL = "/videogames";

// Definimos constantes para las acciones (action types)
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const CLEAR_VIDEOGAME = "CLEAR_VIDEOGAME"
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_GENRES = "GET_GENRES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const SORT_ALPHABETICALLY = "SORT_ALPABETICALLY";
export const SORT_BY_RATING = "SORT_BY_RATINH";

// Acción para obtener la lista de videojuegos
export const getVideogames = () => {
  return async function (dispatch) {
    // Realizamos una solicitud HTTP GET para obtener la lista de videojuegos
    const videogames = (await axios.get(URL)).data;
    // Despachamos la acción con la lista de videojuegos como payload
    dispatch({ type: GET_VIDEOGAMES, payload: videogames });
  };
};

// Acción para obtener un videojuego por su ID
export const getVideogame = (id) => {
  return async function (dispatch) {
    try {
      // Realizamos una solicitud HTTP GET para obtener un videojuego por su ID
      const videogame = (await axios.get(`${URL}/${id}`)).data;
      // Despachamos la acción con el videojuego obtenido como payload
      dispatch({ type: GET_VIDEOGAME, payload: videogame });
    } catch (error) {
      console.log(error);
    }
  };
};

// Acción para limpiar el estado del detalle del videojuego
export const clearVideogameDetail = () => {
  return {type: CLEAR_VIDEOGAME};
};

// Acción para obtener videojuegos por nombre
export const getVideogamesByName = (name) => {
  return async function (dispatch) {
    // Realizamos una solicitud HTTP GET para obtener videojuegos por nombre
    const videogame = (await axios.get(`${URL}?name=${name}`)).data;
    // Despachamos la acción con los videojuegos obtenidos como payload
    dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: videogame });
  };
};

// Acción para obtener la lista de géneros de videojuegos
export const getGenres = () => {
  return async function (dispatch) {
    // Realizamos una solicitud HTTP GET para obtener la lista de géneros
    const genres = (await axios.get("/genres")).data;
    // Despachamos la acción con la lista de géneros como payload
    dispatch({ type: GET_GENRES, payload: genres });
  };
};

// Acción para crear un nuevo videojuego
export const postVideogame = (payload) => {
  return async function () {
    // Realizamos una solicitud HTTP POST para crear un nuevo videojuego
    const videogame = await axios.post(URL, payload);
    return videogame;
  };
};

// Otras acciones para filtrar, ordenar y realizar otras operaciones en la lista de videojuegos
export const filterVideogamesByGenre = (payload) => {
  return { type: FILTER_BY_GENRE, payload };
};

export const sortVideogamesAlphabetically = (payload) => {
  return { type: SORT_ALPHABETICALLY, payload };
};

export const sortVideogamesByRating = (payload) => {
  return { type: SORT_BY_RATING, payload };
};

export const filterVideogamesBySource = (payload) => {
  return { type: FILTER_BY_SOURCE, payload };
};
