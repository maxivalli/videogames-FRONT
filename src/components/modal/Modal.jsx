import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions";
import style from "./Modal.module.css";

export const Modal = ({ message, onClose }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    dispatch(getVideogames());
    navigate("/home"); 
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

