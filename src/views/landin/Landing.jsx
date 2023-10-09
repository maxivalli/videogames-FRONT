import React from 'react'
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../assets/Logo.png"
import style from "./Landing.module.css"

export const Landing = () => {

  const { loginWithRedirect } = useAuth0();
  return (
    <div className={style.container}>
      <img src={Logo}></img>
      <Link to="/home">
        <button onClick={() => loginWithRedirect()}>Login</button>
      </Link>
    </div>
  )
}
