import React from 'react'
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png"
import style from "./Landing.module.css"

export const Landing = () => {
  return (
    <div className={style.container}>
      <img src={Logo}></img>
      <Link to="/home">
        <button>Join!</button>
      </Link>
    </div>
  )
}
