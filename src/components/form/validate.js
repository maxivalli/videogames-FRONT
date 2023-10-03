export const validate = (form, setErrors) => {
  let newErrors = {};

  if (form.name.length < 2) {
    newErrors.name = "Mínimo 2 caracteres";
  } else if (form.name.length > 40) {
    newErrors.name = "Máximo 40 caracteres";
  } else {
    newErrors.name = "";
  }

  if (form.image === "") {
    newErrors.image = "";
  } else if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(form.image)) {
    newErrors.image = "";
  } else {
    newErrors.image = "Debe ser una URL válida";
  }

  if (form.platforms.length > 0) newErrors.platforms = "";

  // Comprobar si la fecha seleccionada es una fecha pasada
  const currentDate = new Date();
  const selectedDate = new Date(form.released);

  if (selectedDate > currentDate) {
    newErrors.released = "Selecciona una fecha anterior a la actual";
  } else {
    newErrors.released = "";
  }

  if (form.rating < 1 || form.rating > 5) {
    newErrors.rating = "El Rating debe estar entre 1 y 5";
  } else {
    newErrors.rating = "";
  }

  if (form.genres.length > 0) newErrors.genres = "";

  if (form.description.length === 0) {
    newErrors.description = "";
  } else if (form.description.length < 15) {
    newErrors.description = "Mínimo 15 caracteres";
  } else {
    newErrors.description = "";
  }

  // Llama a setErrors para actualizar los errores en el componente
  setErrors(newErrors);

  return newErrors;
};
