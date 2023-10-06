import React from "react";
import style from "./About.module.css";

export const About = () => {
  return (
    <>
      <div className={style.header}>
        <h1>About</h1>
      </div>
      <div className={style.container}>
        <div>
          <h2>About the SPA</h2>
        </div>
        <div className={style.description}>
          <p>
            This is a Single Page Application (SPA) that uses the following
            technologies: React, Redux, Node, Express, and Sequelize.
            <br />
            It was created with the purpose of applying basic styling and design
            (UX: UI) resources, reinforcing and connecting the concepts learned
            during the course, and acquiring best practices.
            <br />
            Additionally, it serves as a means to learn and practice the GIT
            workflow.
            <br />
            <br />
            The idea behind this project was to build a web application using
            the rawg API that allows users to:
            <br />
            Search for videogames. View information about videogames. Filter and
            sort videogames. Create new videogames.
          </p>
        </div>
      </div>
    </>
  );
};
