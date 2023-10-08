import React from "react";
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions";
import style from "./Modal.module.css";

export const Modal = ({ message, onClose }) => {

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(getVideogames()); 
    onClose(); 
  };

  return (
    <div className={style.container}>
      <div className={style.message}>
        <p>{message}</p>
        <button onClick={handleButtonClick}>Close</button>
      </div>
    </div>
  );
};

