import React from "react";
import style from "./Modal.module.css";

export const Modal = ({ message, onClose }) => {
  return (
    <div className={style.container}>
      <div className={style.message}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

