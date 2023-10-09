import React from "react";
import axios from "axios";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  return (
    <>
      <ScrollToTop />
      {(location.pathname === "/home" ||
        location.pathname === "/create" ||
        location.pathname === "/about" ||
        location.pathname.match(/^\/detail\/[\w-]+$/)) && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/home" element={isAuthenticated && <Home />} />

        <Route path="/create" element={isAuthenticated ? <Create /> : <Navigate to="/" />} />

        <Route path="/detail/:id" element={isAuthenticated ? <Detail /> : <Navigate to="/" />} />

        <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/" />} />

        <Route path="*" element={isAuthenticated ? <Error /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
