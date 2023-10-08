export const validate = (form, setErrors) => {
  let newErrors = {};

  if (form.name.length < 2) {
    newErrors.name = "At least two characters required";
  } else if (form.name.length > 40) {
    newErrors.name = "Maximum 40 characters";
  } else {
    newErrors.name = "";
  }

  if (form.image === "") {
    newErrors.image = "";
  } else if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(form.image)) {
    newErrors.image = "";
  } else {
    newErrors.image = "Must be a valid URL";
  }

  if (form.platforms.length > 0) newErrors.platforms = "";

  // Comprobar si la fecha seleccionada es una fecha pasada
  const currentDate = new Date();
  const selectedDate = new Date(form.released);

  if (selectedDate > currentDate) {
    newErrors.released = "Select a date prior to the current one";
  } else {
    newErrors.released = "";
  }

  if (form.rating < 1 || form.rating > 5) {
    newErrors.rating = "The rating must be between 1 and 5";
  } else {
    newErrors.rating = "";
  }

  if (form.genres.length > 0) newErrors.genres = "";

  if (form.description.trim().length === 0) {
    newErrors.description = "";
  } else if (form.description.trim().length < 15) {
    newErrors.description = "At least 15 characters required";
  } else if (!/^(\S{1,20}\s)*\S{1,20}$/.test(form.description)) {
    newErrors.description = "Add a space every 20 characters";
  } else {
    newErrors.description = "";
  }
  
  
  
  
  

  // Llama a setErrors para actualizar los errores en el componente
  setErrors(newErrors);

  return newErrors;
};
