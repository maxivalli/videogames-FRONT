import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { Searchbar } from "../searchbar/Searchbar";
import { Filter } from "../filter/Filter";
import style from "./Navbar.module.css";

export const Navbar = () => {
  const { logout } = useAuth0();
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
          
            <button
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: "https://maxivalli.github.io/videogames-FRONT/",
                  },
                })
              }
              className={style.logout}
            >
              Logout
            </button>
          
        </div>
      </div>
    </>
  );
};
