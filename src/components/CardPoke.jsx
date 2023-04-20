import { Fragment, useContext, useEffect, useState } from "react"
import { UseApiContext } from "../context/ApiContext"
import { colorsType } from '../context/colors';

export default function CardPoke({poke,i,setCargando}){
    const [pokeInfo,setPokeInfo]=useState([])
    const { apiPoke } = useContext(UseApiContext)

    useEffect(() => {
        if(poke.url.indexOf("pokemon-species")!==-1){
            let url=`${poke.url.substr(0,poke.url.indexOf("species")-1)}/${poke.url.substr(poke.url.indexOf("species")+8,poke.url.length)}`
            apiPoke(url).then((res)=>{
                console.log(res)
                setPokeInfo(res)
                if(i){
                    setCargando(false)
                }
            })
        }else{
            apiPoke(poke.url).then((res)=>{
                setPokeInfo(res)
                if(i){
                    setCargando(false)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <>
            {pokeInfo.length!==0 &&
                <div className="card-container" style={{backgroundColor:colorsType.find(e=>e.name===pokeInfo.types[0].type.name).color}}>
                    <div className="fondo">
                        <h2>{pokeInfo.name[0].toUpperCase()}{pokeInfo.name.slice(1)}</h2>
                        <div className="stats">
                            <div className="circle">
                                <div>
                                    {pokeInfo.stats.find(e=>e.stat.name==="attack").base_stat}
                                </div>
                                <p>Attack</p>
                            </div>
                            <div className="circle">
                                <div>
                                    {pokeInfo.stats.find(e=>e.stat.name==="defense").base_stat}
                                </div>
                                <p>Defense</p>
                            </div>
                        </div>
                        <div className="types">
                            {pokeInfo.types.map((obj,i)=>{
                                return(
                                    <Fragment key={i}>
                                        {i<2 &&
                                            <div style={{backgroundColor:colorsType.find(e=>e.name===obj.type.name).color}}>
                                                {obj.type.name[0].toUpperCase()}{obj.type.name.slice(1)}
                                            </div>
                                        }
                                    </Fragment>
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