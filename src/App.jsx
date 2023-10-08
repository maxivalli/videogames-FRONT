import React from "react";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./views/home/Home";
import { Create } from "./views/create/Create";
import { Landing } from "./views/landin/Landing";
import { Detail } from "./views/datail/Detail";
import { About } from "./views/about/About";
import { Error } from "./views/error/Error";
import ScrollToTop from "./functions/ScrollToTop";
import "./App.css";

/* axios.defaults.baseURL = 'http://localhost:3001'; */
axios.defaults.baseURL = "https://videogames-server-production.up.railway.app";

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      {(location.pathname === "/home" ||
        location.pathname === "/create" ||
        location.pathname === "/about" ||
        location.pathname.match(/^\/detail\/\d+$/)) && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Home />} />

        <Route path="/create" element={<Create />} />

        <Route path="/detail/:id" element={<Detail />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
