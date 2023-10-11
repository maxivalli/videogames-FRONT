import React from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./views/home/Home";
import { Create } from "./views/create/Create";
import { Landing } from "./views/landing/Landing";
import { Detail } from "./views/datail/Detail";
import { About } from "./views/about/About";
import { Error } from "./views/error/Error";
import ScrollToTop from "./functions/ScrollToTop";
import "./App.css";

/* axios.defaults.baseURL = 'http://localhost:3001'; */
axios.defaults.baseURL = "https://videogames-server-production.up.railway.app";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/home" element={isAuthenticated && <><Home /> <Navbar/></>} />

        <Route path="/create" element={isAuthenticated && <><Create /> <Navbar/></>} />

        <Route path="/detail/:id" element={isAuthenticated && <><Detail /> <Navbar/></>} />

        <Route path="/about" element={isAuthenticated && <><About /> <Navbar/></>} />

        <Route path="*" element={isAuthenticated ? <Error /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
