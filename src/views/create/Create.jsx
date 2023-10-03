import React from "react";
import { Form } from "../../components/form/Form";
import { Navbar } from "../../components/navbar/Navbar";
import style from "./Create.module.css";

export const Create = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className={style.header}>
        <h1>Create</h1>
      </div>
      <Form />
    </>
  );
};
