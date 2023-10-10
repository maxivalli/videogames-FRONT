import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogames, getVideogamesByName } from "../../redux/actions";
import style from "./Searchbar.module.css";

export const Searchbar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    if (!name) {
      dispatch(getVideogames());
    } else {
      dispatch(getVideogamesByName(name));
    }

    setName("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div className={style.container}>
        <NavLink to="/create" className={style.link}>
          <button className={style.create}>✎</button>
        </NavLink>
        <input
          type="text"
          value={name}
          placeholder={isFocused ? "" : "Search"}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>

        <button className={style.search} onClick={handleSearch}>
          ⚲
        </button>
      </div>
    </>
  );
};
