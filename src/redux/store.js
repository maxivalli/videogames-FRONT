import { createStore, applyMiddleware } from 'redux'; // Importamos funciones de Redux
import rootReducer from './reducer'; // Importamos el reducer raíz
import thunkMiddleware from 'redux-thunk'; // Importamos Redux Thunk middleware

// Creamos la tienda (store) de Redux configurándola con el reducer raíz y el middleware de Redux Thunk
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store; // Exportamos la tienda configurada
