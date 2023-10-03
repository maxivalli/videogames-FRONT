import React from 'react'
import Logo from "../../assets/logo.png"
import style from './Header.module.css';

export const Header = () => {
  return (
    <>
    <div className={style.container}>
        <img src={Logo}></img>
    </div>
    </>
  )
}
