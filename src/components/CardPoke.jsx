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
                    <div className="fondo" style={{backgroundColor:colorsType.find(e=>e.name===pokeInfo.types[0].type.name).color}}>
                        <h2>{pokeInfo.name}</h2>
                        <div className="stats">
                            <div className="circle">{pokeInfo.stats.find(e=>e.stat.name==="attack").base_stat}</div>
                            <div className="circle">{pokeInfo.stats.find(e=>e.stat.name==="defense").base_stat}</div>
                        </div>
                        <div className="types">
                            {pokeInfo.types.map((obj,i)=>{
                                return(
                                    <>
                                        {i<2 &&
                                            <div style={{backgroundColor:colorsType.find(e=>e.name===obj.type.name).color}}>
                                                {obj.type.name}
                                            </div>
                                        }
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <img src={pokeInfo.sprites.front_default} alt={pokeInfo.name} />
                </div>
            }
        </>
    )
}