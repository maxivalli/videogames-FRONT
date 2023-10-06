import React from "react";
import { Header } from "../../components/header/Header";
import { Cards } from "../../components/cards/Cards";
import style from "./Home.module.css";

export const Home = () => {
  return (
    <>
      <Header />
      <div className={style.container}>
        <Cards />
      </div>
    </>
  );
};
