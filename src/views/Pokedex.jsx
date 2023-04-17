import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  UseApiContext } from "../context/ApiContext";
import SearchIcon from '@mui/icons-material/Search';
import { SvgIcon } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Pokedex({openMenu}){
    const [openFilters,setOpenFilters]=useState(false)

    const [lupa,setLupa]=useState(false)

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
                    

                </div>
                <div className={`fondoAlt ${openFilters?"open":"close"}`} onClick={()=>setOpenFilters(!openFilters)}></div>
            </div>
    )
}