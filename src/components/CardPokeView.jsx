import { useEffect, useState } from "react"
import { colorsType } from '../context/colors';

export default function CardPokeView({pokeInfo}){
    const [carga,setCarga]=useState(false)

    useEffect(() => {
        if(!carga){
            setTimeout(() => {
               setCarga(true) 
            }, 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className={`cardPokeView-container ${carga?"open":"close"}`} style={{backgroundColor:colorsType.find(e=>e.name===pokeInfo.types[0].type.name).color}}>
            
        </div>
    )
}