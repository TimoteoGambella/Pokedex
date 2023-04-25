import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import {  ApiContext } from "./context/ApiContext";
import Home from "./views/Home";
import "./styles/styles.scss"
import Pokedex from "./views/Pokedex";
import { useState } from "react";
import Error from "./views/Error";
// import Legendarios from "./views/Legendarios";

function App() {
  const [openMenu,setOpenMenu]=useState(false)

  return (
    <ApiContext>
      <BrowserRouter>
        <NavBar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/*" element={<Error />}/>
          <Route path="/pokedex" element={<Pokedex openMenu={openMenu} setOpenMenu={setOpenMenu}/>}/>
          {/* <Route path="/Legendaries" element={<Legendarios />}/> */}
        </Routes>
      </BrowserRouter>
    </ApiContext>
  );
}

export default App;

// https://tenor.com/es/search/pikachu-stickers