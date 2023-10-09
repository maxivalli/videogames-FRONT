import React from "react";
import { Profile } from "../../components/profile/Profile";
import Logo from "../../assets/Logo.png";
import style from "./Header.module.css";

export const Header = () => {
  return (
    <>
      <div className={style.container}>
        <Profile></Profile>
        <img src={Logo} className={style.img}></img>
      </div>
    </>
  );
};
