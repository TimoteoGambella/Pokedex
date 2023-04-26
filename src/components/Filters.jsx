import {  UseApiContext } from "../context/ApiContext";
import { useContext } from "react";
import radio from "../assets/radio.svg"
import radio2 from "../assets/radio2.svg"

export default function Filters({openFilters,setOpenFilters,types,setTypes,generations,setGenerations,setPokesFilter,buscadorFiltros}){

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
                    {allTypes.length !== 0 && allTypes.results.map((obj,i)=>{
                        return(
                            <div key={i} onClick={()=>types===obj.name?setTypes(""):setTypes(obj.name)}>
                                <img src={types===obj.name?radio:radio2} alt="RADIOST" />
                                <p>{obj.name[0].toUpperCase()}{obj.name.slice(1)}</p>
                            </div>
                        )
                    })}
                </div>

                <h3>Generations</h3>
                <div className="generations">
                    {allGenerations.length !== 0 && allGenerations.results.map((obj,i)=>{
                        return(
                            <div key={i} onClick={()=>generations===obj.name?setGenerations(""):setGenerations(obj.name)}>
                                <img src={generations===obj.name?radio:radio2} alt="RADIOSG" />
                                <p>{obj.name[0].toUpperCase()}{obj.name.slice(1)}</p>
                            </div>
                        )
                    })}
                </div>

                <p className="button" onClick={async()=>{
                    await buscadorFiltros()
                    setOpenFilters(!openFilters)
                }}>Aplicar</p>
                
                <p className="button2" onClick={()=>{
                    setOpenFilters(false)
                    setPokesFilter([])
                    setTypes("")
                    setGenerations("")
                }}>Limpiar filtros</p>
            </div>
        </div>  
    )
}