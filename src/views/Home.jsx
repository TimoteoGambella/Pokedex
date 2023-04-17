import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  UseApiContext } from "../context/ApiContext";
import banner from "../assets/banner.svg"

export default function Home(){
    const navigate=useNavigate()
    const {generation}=useParams()
    const { colorsTypes, apiPoke, allPokes } = useContext(UseApiContext)

    const [generationPokes,setGenerationPokes]=useState([])

//     useEffect(() => {
//         if(generation!==undefined){
//             apiPoke(`https://pokeapi.co/api/v2/generation/${generation}`).then((res)=>setGenerationPokes(res))
//         }
        
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
// console.log(generationPokes)
    return(
        <div className="home-container">
            <img src={banner} alt="BANNER" />
            <h2><span>Find</span> all your favorite <span>Pokemon</span></h2>
            <h3>You can know the type of Pokemon, its strengths, disadvantages and abilities</h3>
            <p onClick={()=>navigate("/pokedex")}>See Pokemons</p>
        </div>
    )
}