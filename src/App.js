import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";
import Home from "./views/Home";

function App() {
  fetch("https://pokeapi.co/api/v2/pokemon/?offset=150").then((res)=>res.json().then((res)=>console.log(res)))
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;

// https://tenor.com/es/search/pikachu-stickers