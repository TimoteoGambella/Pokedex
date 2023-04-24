import { useEffect, useState } from "react"

export default function CardPokeView({}){
    const [carga,setCarga]=useState(false)

    useEffect(() => {
        if(!carga){
            setTimeout(() => {
               setCarga(true) 
            }, 100);
        }
    }, []);

    return(
        <div className={`cardPokeView-container ${carga?"open":"close"}`}>
            
        </div>
    )
}