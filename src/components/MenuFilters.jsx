import {  UseApiContext } from "../context/ApiContext";
import { useContext } from "react";
import radio from "../assets/radio.svg"
import radio2 from "../assets/radio2.svg"

export default function MenuFilters({openFilters,setOpenFilters,types,setTypes,generations,setGenerations,setPokesFilter,buscadorFiltros}){

    const { allTypes, allGenerations } = useContext(UseApiContext)

    return(
        <div className={`filtros-menu ${openFilters?"open":"close"}`}>
            <div className="subDiv">
                <button className={`hamburger hamburger--stack ${openFilters&&"active"}`} type="button"
                    onClick={()=>{
                        window.scrollTo({
                            top: 0,
                            behavior: "auto",
                        });
                        setOpenFilters(!openFilters)
                    }}
                >
                    <div className="inner">
                        <span className={`bar bar2`}></span>
                        <span className={`bar bar2 bar2-background`}></span>
                        <span className={`bar bar2`}></span>
                    </div>
                </button>
                
                <h3>Types</h3>
                <div className="types">
                    {allTypes.length !== 0 && allTypes.map((obj,i)=>{
                        return(
                            <div key={i} onClick={()=>types===obj.name?setTypes(""):setTypes(obj.name.toLowerCase())}>
                                <img src={types===obj.name.toLowerCase()?radio:radio2} alt="RADIOST" />
                                <p>{obj.name}</p>
                            </div>
                        )
                    })}
                </div>

                <h3>Generations</h3>
                <div className="generations">
                    {allGenerations.length !== 0 && allGenerations.map((obj,i)=>{
                        return(
                            <div key={i} onClick={()=>generations===obj.name?setGenerations(""):setGenerations(obj.name.toLowerCase())}>
                                <img src={generations===obj.name.toLowerCase()?radio:radio2} alt="RADIOSG" />
                                <p>{obj.name}</p>
                            </div>
                        )
                    })}
                </div>

                <p className="button" onClick={async()=>{
                    await buscadorFiltros()
                    setOpenFilters(!openFilters)
                }}>Aplicar</p>
                
                <p className="button2" onClick={()=>{
                    if(types.length!==0 || generations.length!==0){
                        setOpenFilters(false)
                        setPokesFilter([])
                        setTypes("")
                        setGenerations("")
                    }
                }}>Limpiar filtros</p>
            </div>
        </div>  
    )
}