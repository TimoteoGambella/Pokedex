import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import {  ApiContext } from "./context/ApiContext";
import Home from "./views/Home";
import "./styles/styles.scss"
import Pokedex from "./views/Pokedex";

function App() {

  return (
    <ApiContext>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/pokedex" element={<Pokedex />}/>
        </Routes>
      </BrowserRouter>
    </ApiContext>
  );
}

export default App;

// https://tenor.com/es/search/pikachu-stickers