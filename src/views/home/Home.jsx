import React from "react";
import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import { Cards } from "../../components/cards/Cards";
import style from "./Home.module.css";

export const Home = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className={style.container}>
        <Cards />
      </div>
    </>
  );
};
