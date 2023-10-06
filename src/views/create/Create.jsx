import React from "react";
import { Form } from "../../components/form/Form";
import style from "./Create.module.css";

export const Create = () => {
  return (
    <>
      <div className={style.header}>
        <h1>Create</h1>
      </div>
      <Form />
    </>
  );
};
