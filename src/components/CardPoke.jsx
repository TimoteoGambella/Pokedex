import { useContext, useEffect, useState } from "react"
import { UseApiContext } from "../context/ApiContext"
import { colorsType } from '../context/colors';

export default function CardPoke({poke,i,setCargando}){
    const [pokeInfo,setPokeInfo]=useState([])
    const { apiPoke } = useContext(UseApiContext)

    useEffect(() => {
        apiPoke(poke.url).then((res)=>{
            setPokeInfo(res)
            if(i){
                setCargando(false)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
console.log(pokeInfo)
    return(
        <>
            {pokeInfo.length!==0 &&
                <div className="card-container">
                    <div className="fondo" style={{backgroundColor:colorsType.find(e=>e.name===pokeInfo.types[0].type.name).color}}></div>
                </div>
            }
        </>
    )
}