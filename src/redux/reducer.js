import {
  GET_VIDEOGAMES,
  SET_HAS_LOADED_VIDEOGAMES,
  GET_VIDEOGAME,
  CLEAR_VIDEOGAME,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  POST_VIDEOGAME,
  FILTER_BY_GENRE,
  FILTER_BY_SOURCE,
  SORT_ALPHABETICALLY,
  SORT_BY_RATING,
} from "./actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  detail: [],
  genres: [],
  hasLoadedVideogames: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case SET_HAS_LOADED_VIDEOGAMES:
      return {
        ...state,
        hasLoadedVideogames: action.payload,
      };

    case GET_VIDEOGAME:
      return { ...state, detail: action.payload };

    case CLEAR_VIDEOGAME:
      return { ...state, detail: null };

    case GET_VIDEOGAMES_BY_NAME:
      return { ...state, videogames: action.payload, allVideogames: action.payload};

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case POST_VIDEOGAME:
      return { ...state };

    case FILTER_BY_GENRE:
      const allVideogames1 = state.allVideogames;
      const filteredVideogames =
        action.payload === "All"
          ? allVideogames1
          : allVideogames1.filter((videogame) =>
              videogame.genres.includes(action.payload)
            );
      return { ...state, 
        videogames: 
        action.payload === "All" ? state.allVideogames : filteredVideogames };

    case FILTER_BY_SOURCE:
      const allVideogames2 = state.allVideogames;
      const createdFilter =
        action.payload === "created"
          ? allVideogames2.filter((videogame) => videogame.created)
          : allVideogames2.filter((videogame) => !videogame.created);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : createdFilter,
      };

    case SORT_ALPHABETICALLY:
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
      return state;
  }
};

export default rootReducer;
