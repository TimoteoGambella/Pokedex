import { Fragment, useContext, useEffect, useState } from "react"
import { UseApiContext } from "../context/ApiContext"
import { colorsType } from '../context/colors';
import CardPokeView from "./CardPokeView";

export default function CardPoke({poke,i,generations,types}){
    const { apiPoke,isTablet,isDesktop } = useContext(UseApiContext)

    const [pokeInfo,setPokeInfo]=useState([])
    const [pokeView,setPokeView]=useState(false)

    useEffect(() => {
        if(poke.url !== undefined && poke.url.indexOf("pokemon-species")!==-1){
            let url=`${poke.url.substr(0,poke.url.indexOf("species")-1)}/${poke.url.substr(poke.url.indexOf("species")+8,poke.url.length)}`
            apiPoke(url).then((res)=>{
                if(generations!==""&&types!==""){
                    for (const key in res.types) {
                        if (res.types[key].type.name===types) {
                            setPokeInfo(res)
                        }
                    }
                }else{
                    setPokeInfo(res)
                    if(i){
                    }
                }
            })
        }else{
            apiPoke(poke.pokemon?poke.pokemon.url:poke.url).then((res)=>{
                setPokeInfo(res)
                if(i){
                }
            })
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return(
        <>
            {pokeInfo.length!==0 &&
                <div className={`card-container ${isTablet&&!isDesktop?"tablet":isDesktop?"desktop":""}`} onClick={()=>setPokeView(!pokeView)} style={{backgroundColor:colorsType.find(e=>e.name===pokeInfo.types[0].type.name).color}}>
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
            {pokeView && <CardPokeView pokeInfo={pokeInfo} setPokeView={setPokeView}/>}
        </>
    )
}