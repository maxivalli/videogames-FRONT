import React from "react";
import { NavLink } from "react-router-dom";
import { Searchbar } from "../searchbar/Searchbar";
import { Filter } from "../filter/filter";
import style from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <>
      <div className={style.container}>
        <NavLink to="/create">
        <button className={style.create}>Create</button>
        </NavLink>
        <Searchbar />
        <Filter />
        <div className={style.buttons}>
          <NavLink to="/home">
          <button>Home</button>
          </NavLink>
          <NavLink to="/about">
          <button>About</button>
          </NavLink>
          <NavLink to="/">
            <button className={style.logout}>Logout</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
