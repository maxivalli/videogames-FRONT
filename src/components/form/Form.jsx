import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postVideogame } from "../../redux/actions";
import { validate } from "./validate";
import style from "./Form.module.css";

export const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  // Estado para almacenar el formulario y los errores
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

  // Obtener los géneros cuando el componente se monta
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  // Manejador de cambios en los campos del formulario
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    // Validar el formulario y establecer los errores
    validate({ ...form, [property]: value }, setErrors);

    // Actualizar el estado del formulario con los nuevos valores
    setForm({ ...form, [property]: value });
  };

  // Manejador de selección de opciones (plataformas y géneros)
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

  // Manejador de envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Realizar una solicitud GET para obtener todos los videojuegos
    axios
      .get(`/videogames`)
      .then((response) => {
        const allVideogames = response.data;

        // Filtrar los videojuegos por nombre para verificar duplicados
        const filteredVideogames = allVideogames.filter(
          (videogame) =>
            videogame.name.toLowerCase() === form.name.toLowerCase()
        );

        const newErrors = { ...errors };

        if (filteredVideogames.length > 0) {
          // El videojuego ya existe
          newErrors.name = "Videogame already exists";
        }

        if (form.name === "")
          newErrors.name = "Please write your videogame's name";

        if (form.image === "")
          newErrors.image = "Please write your videogame's name";

        if (form.platforms.length === 0)
          newErrors.platforms = "Please select a platform";

        if (form.released === "")
          newErrors.released = "Please select a release date";

        if (form.rating === "") newErrors.rating = "Please rate your game";

        if (form.genres.length === 0)
          newErrors.genres = "Please select a genre";

        // Establecer los errores actualizados en el estado
        setErrors(newErrors);

        // Comprobar si no hay errores
        const hasNoErrors = Object.values(newErrors).every(
          (value) => value === ""
        );

        if (hasNoErrors) {
          // Continuar con el envío del formulario si no hay errores
          dispatch(postVideogame(form));
          alert("Videogame Created!");

          // Restablecer el formulario después de enviarlo con éxito
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
          form: "Hubo un error al crear el videojuego. Por favor, intenta nuevamente.",
        });
      });
  };

  return (
    <div className={style.container}>
      <h2>Crear un videojuego</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
          />
          {errors.name && <div>{errors.name}</div>}
        </div>

        <div>
          <label>Imagen: </label>
          <input
            type="text"
            value={form.image}
            onChange={changeHandler}
            name="image"
          />
          {errors.image && <div>{errors.image}</div>}
        </div>

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
            </div>
          )}
          {errors.platforms && <div>{errors.platforms}</div>}
        </div>

        <div>
          <label>Lanzado:</label>
          <input
            type="date"
            value={form.released}
            onChange={changeHandler}
            name="released"
          />
          <div>{errors.released && <span>{errors.released}</span>}</div>
        </div>

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

        <div>
          <label>Género:</label>
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
            </div>
          )}
          <div>{errors.genres && <span>{errors.genres}</span>}</div>
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            type="text"
            value={form.description}
            onChange={changeHandler}
            name="description"
          />
          <div>{errors.description && <span>{errors.description}</span>}</div>
        </div>
        <button type="submit" className={style.submit}>
          Create
        </button>
        {errors.form && <span>{errors.form}</span>}
      </form>
    </div>
  );
};
