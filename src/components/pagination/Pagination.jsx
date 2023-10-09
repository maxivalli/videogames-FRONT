import style from "./Pagination.module.css";

export const Pagination = ({
  videogamesPerPage,
  allVideogames,
  currentPage,
  pagination,
}) => {
 
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
      <div className={style.buttons}>
        
        <button
          onClick={() => pagination(currentPage - 1)}
          disabled={currentPage === 1} 
        >
          prev
        </button>
        <div className={style.current}>
        <p>{currentPage}</p>
        </div>
       
        <button
          onClick={() => pagination(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(allVideogames / videogamesPerPage)
          } 
        >
          next
        </button>
      </div>
    </div>
  );
};
