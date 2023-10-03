import React from "react";
import { NavLink } from "react-router-dom"
import style from "./Card.module.css";

export const Card = (props) => {
  return (
    <>
      <div className={style.container}>
        <h4>{props.rating}</h4>
        <div className={style.img}>
        <img src={props.image}></img>
        </div>
        <h5 className={style.name}>{props.name}</h5>
        <h5>{props.genres}</h5>
        <div className={style.buttons}>
        <NavLink to={`/detail/${props.id}`}>
        <button>ℹ︎</button>
        </NavLink>
        </div>
      </div>
    </>
  );
};
