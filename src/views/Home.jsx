import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  UseApiContext } from "../context/ApiContext";
import banner from "../assets/banner.svg"

export default function Home(){
    const {generation}=useParams()
    const { colorsTypes, apiPoke, allPokes } = useContext(UseApiContext)

    const [generationPokes,setGenerationPokes]=useState([])

    useEffect(() => {
        if(generation!==undefined){
            apiPoke(`https://pokeapi.co/api/v2/generation/${generation}`).then((res)=>setGenerationPokes(res))
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(allPokes)
    }, [allPokes]);

    return(
        <div className="home-container">
            <img src={banner} alt="BANNER" />
        </div>
    )
}