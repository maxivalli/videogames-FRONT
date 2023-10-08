import React from 'react';
import { Link } from "react-router-dom";
import style from "./Error.module.css";

export const Error = () => {
  return (
    <>
    <div>
      <h1>Page not found</h1>
    </div>
    <div>
      <Link to="/home">
      <button className={style.home}>Home</button>
      </Link>
    </div>
    </>
  )
}
