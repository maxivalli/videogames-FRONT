import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import style from "./Landing.module.css";

export const Landing = () => {

  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/home");
  };

  if (isAuthenticated) return (
    <div className={style.container}>
      <img src={Logo}></img>

      <button onClick={handleJoinClick}>Join!</button>
    </div>
  )
  
  return (
    <div className={style.container}>
      <img src={Logo}></img>

      <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  );
};
