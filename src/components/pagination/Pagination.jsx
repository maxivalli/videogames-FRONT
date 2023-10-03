import style from "./Pagination.module.css";

export const Pagination = ({
  videogamesPerPage,
  allVideogames,
  currentPage,
  pagination,
}) => {
  // Calcula la cantidad total de páginas necesarias para la paginación
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
      <div className={style.buttons}>
        {/* Botón "prev" para ir a la página anterior */}
        <button
          onClick={() => pagination(currentPage - 1)}
          disabled={currentPage === 1} // Deshabilita si estamos en la primera página
        >
          prev
        </button>
        {/* Botón "next" para ir a la página siguiente */}
        <button
          onClick={() => pagination(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(allVideogames / videogamesPerPage)
          } // Deshabilita si estamos en la última página
        >
          next
        </button>
      </div>
    </div>
  );
};
