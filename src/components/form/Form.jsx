import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postVideogame } from "../../redux/actions";
import { validate } from "./validate";
import { Modal } from "../modal/Modal";
import style from "./Form.module.css";

export const Form = () => {
  // DISPATCH Y SELECTOR
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  // ESTADOS DEL FORMULARIO Y ERRORES
  const [form, setForm] = useState({
    name: "",
    image: "",
    platforms: [],
    released: "",
    rating: 1,
    genres: [],
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    platforms: "",
    released: "",
    rating: "",
    genres: "",
    description: "",
    form: "",
  });

  // ESTADO DEL MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // OBTENER GÉNEROS AL MONTAR EL COMPONENTE
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  // MANEJADOR DE CAMBIOS EN LOS CAMPOS DEL FORMULARIO
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    // VALIDAR EL FORMULARIO Y ESTABLECER LOS ERRORES
    validate({ ...form, [property]: value }, setErrors);

    // ACTUALIZAR EL ESTADO DEL FORMULARIO CON LOS NUEVOS VALORES
    setForm({ ...form, [property]: value });
  };

  // MANEJADOR DE SELECCIÓN DE OPCIONES (PLATAFORMAS Y GÉNEROS)
  const handleSelect = (event) => {
    const { name, value } = event.target;

    if (name === "platforms") {
      if (!form.platforms.includes(value)) {
        setForm({
          ...form,
          platforms: [...form.platforms, value],
        });
      }
    } else if (name === "genres") {
      if (!form.genres.includes(value)) {
        setForm({
          ...form,
          genres: [...form.genres, value],
        });
      }
    }
  };

  //PARA LIMPIAR LOS SELECT
  const clearSelection = (property) => {
    setForm({
      ...form,
      [property]: [],
    });
  };

  //COMPRUEBA SI TODOS LOS CAMPOS ESTAN COMPLETOS Y SIN ERRORES
  const isFormValid = () => {
    return (
      Object.values(errors).every((value) => value === "") &&
      form.name !== "" &&
      form.image !== "" &&
      form.platforms.length > 0 &&
      form.released !== "" &&
      form.rating !== "" &&
      form.genres.length > 0
    );
  };

  // MANEJADOR DE ENVÍO DEL FORMULARIO
  const handleSubmit = (event) => {
    event.preventDefault();

    // REALIZAR UNA SOLICITUD GET PARA OBTENER TODOS LOS VIDEOJUEGOS
    axios
      .get(`/videogames`)
      .then((response) => {
        const allVideogames = response.data;

        // FILTRAR LOS VIDEOJUEGOS POR NOMBRE PARA VERIFICAR DUPLICADOS
        const filteredVideogames = allVideogames.filter(
          (videogame) =>
            videogame.name.toLowerCase() === form.name.toLowerCase()
        );

        const newErrors = { ...errors };

        if (filteredVideogames.length > 0) {
          // EL VIDEOJUEGO YA EXISTE
          newErrors.name = "The name of the videogame already exists";
        }

        if (form.name === "") newErrors.name = "Write a name";
        if (form.image === "")
          newErrors.image = "Insert a valid link for the image";
        if (form.platforms.length === 0)
          newErrors.platforms = "Select a platform";
        if (form.released === "") newErrors.released = "Select a date";
        if (form.rating === "") newErrors.rating = "Select a rating";
        if (form.genres.length === 0) newErrors.genres = "Select a genre";

        // ESTABLECER LOS ERRORES ACTUALIZADOS EN EL ESTADO
        setErrors(newErrors);

        // COMPROBAR SI NO HAY ERRORES
        const hasNoErrors = Object.values(newErrors).every(
          (value) => value === ""
        );

        if (hasNoErrors) {
          // CONTINUAR CON EL ENVÍO DEL FORMULARIO SI NO HAY ERRORES
          dispatch(postVideogame(form));
          setModalMessage("Videogame successfully created!");
          setIsModalOpen(true);

          // RESTABLECER EL FORMULARIO DESPUÉS DE ENVIARLO CON ÉXITO
          setForm({
            name: "",
            image: "",
            platforms: [],
            released: "",
            rating: 1,
            genres: [],
            description: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrors({
          ...errors,
          form: "There was an error while creating the videogame. Please try again.",
        });
      });
  };

  // MANEJADOR PARA CERRAR EL MODAL
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.container}>
      <h2>Create a videogame</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        {/* CAMPO PARA INGRESAR EL NOMBRE */}
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
          />
          {errors.name && <div>{errors.name}</div>}
        </div>
        {/* CAMPO PARA INGRESAR LA IMAGEN */}
        <div>
          <label>Image: </label>
          <input
            type="text"
            value={form.image}
            onChange={changeHandler}
            name="image"
          />
          {errors.image && <div>{errors.image}</div>}
        </div>
        {/* CAMPO PARA INGRESAR LAS PLATAFORMAS */}
        <div>
          <label>Platform:</label>
          <select
            value={form.platforms[0] || ""}
            onChange={handleSelect}
            name="platforms"
          >
            <option value=""></option>
            <option value="PC">PC</option>
            <option value="Playstation 4">Playstation 4</option>
            <option value="Playstation 5">Playstation 5</option>
            <option value="Xbox 360">Xbox 360</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Xbox Series S/X">Xbox Series S/X</option>
          </select>
          {form.platforms.length > 0 && (
            <div className={style.selectedContainer}>
              <ul>
                <li>{form.platforms.map((platform) => platform + ", ")}</li>
              </ul>
              <button onClick={() => clearSelection('platforms')} className={style.clearButton}>
                <>x</>
              </button>
            </div>
          )}
          {errors.platforms && <div>{errors.platforms}</div>}
        </div>
        {/* CAMPO PARA INGRESAR LA FECHA */}
        <div>
          <label>Relased:</label>
          <input
            type="date"
            value={form.released}
            onChange={changeHandler}
            name="released"
          />
          <div>{errors.released && <span>{errors.released}</span>}</div>
        </div>
        {/* CAMPO PARA INGRESAR EL RATING */}
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={form.rating}
            onChange={changeHandler}
            name="rating"
          />
          <div>{errors.rating && <span>{errors.rating}</span>}</div>
        </div>
        {/* CAMPO PARA INGRESAR EL GENERO */}
        <div>
          <label>Genre:</label>
          <select onChange={handleSelect} name="genres">
            <option value=""></option>
            {genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          {form.genres.length > 0 && (
            <div className={style.selectedContainer}>
              <ul>
                <li>{form.genres.map((genre) => genre + ", ")}</li>
              </ul>
              <button onClick={() => clearSelection('genres')} className={style.clearButton}>
                <>x</>
              </button>
            </div>
          )}
          <div>{errors.genres && <span>{errors.genres}</span>}</div>
        </div>
        {/* CAMPO PARA INGRESAR LA DESCRIPCION */}
        <div>
          <label>Description:</label>
          <textarea
            type="text"
            value={form.description}
            onChange={changeHandler}
            name="description"
          />
          <div>{errors.description && <span>{errors.description}</span>}</div>
        </div>
        {/* BOTÓN DE ENVÍO */}
        {isFormValid() && (
          <button type="submit" className={style.submit}>
            Create
          </button>
        )}
        {/* MENSAJE DE ERROR GLOBAL Y MODAL */}
        {errors.form && <span>{errors.form}</span>}
        {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
      </form>
    </div>
  );
};
