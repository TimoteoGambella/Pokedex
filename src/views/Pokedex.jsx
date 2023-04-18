import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  UseApiContext } from "../context/ApiContext";
import SearchIcon from '@mui/icons-material/Search';
import { SvgIcon } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import radio from "../assets/radio.svg"
import radio2 from "../assets/radio2.svg"

export default function Pokedex({openMenu}){
    const { allTypes, allGenerations, apiPoke } = useContext(UseApiContext)

    const [openFilters,setOpenFilters]=useState(false)
    const [lupa,setLupa]=useState(false)
    const [types,setTypes]=useState("")
    const [generations,setGenerations]=useState("")

    useEffect(() => {
        if(openMenu){
            setLupa(true)
        }else{
            if(lupa){
                setTimeout(() => {
                    setLupa(false)
                }, 1000);
            }
        }
    }, [openMenu,lupa])

    return(
            <div className="pokedex-container">
                <p className="banner">800 <span>Pokemons</span> for you to choose your favorite</p>
                <div className="buscador">
                    <input type="text" placeholder="Encuentra tu pokemon..."/>
                    <SvgIcon component={SearchIcon} className="buscador-logo" sx={{zIndex:lupa?-1:0}}/>
                </div>
                <div className="filtros">
                    <p onClick={()=>setOpenFilters(!openFilters)}>Filtros</p>
                    <SvgIcon component={FilterListIcon} className="filtros-logo" onClick={()=>setOpenFilters(!openFilters)}/>
                </div>


                <div className={`filtros-menu ${openFilters?"open":"close"}`}>
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
                                <div key={i} onClick={()=>setTypes(obj.name)}>
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
                                <div key={i} onClick={()=>setGenerations(obj.name)}>
                                    <img src={generations===obj.name?radio:radio2} alt="RADIOSG" />
                                    <p>{obj.name[0].toUpperCase()}{obj.name.slice(1)}</p>
                                </div>
                            )
                        })}
                    </div>

                    <p className="button" onClick={async()=>{
                        if(types!==""||generations!==""){
                            if(types!==""&&generations!==""){
                                await apiPoke(`https://pokeapi.co/api/v2/generation/${generations}`).then((res)=>console.log("OPCION 1",res))
                            }else{
                                await apiPoke(`https://pokeapi.co/api/v2/${types!==""?"type":"generation"}/${types!==""?types:generations}`).then((res)=>console.log("Opcion 2",res))
                            }
                            setOpenFilters(!openFilters)
                        }else{
                            setOpenFilters(!openFilters)
                        }
                    }}>Aplicar</p>
                </div>
                <div className={`fondoAlt ${openFilters?"open":"close"}`} onClick={()=>setOpenFilters(!openFilters)}></div>
            </div>
    )
}