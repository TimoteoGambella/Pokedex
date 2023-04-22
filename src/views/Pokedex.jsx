import { useContext, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { SvgIcon } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Filters from "../components/Filters";
import CardsContent from "../components/CardsContent";
import { UseApiContext } from "../context/ApiContext";

export default function Pokedex({openMenu}){
    const { allPokes, setAllPokes } = useContext(UseApiContext)

    const [openFilters,setOpenFilters]=useState(false)
    const [lupa,setLupa]=useState(false)
    const [types,setTypes]=useState("")
    const [generations,setGenerations]=useState("")

    const [buscando,setBuscando]=useState(false)
    const [pokesFilter,setPokesFilter]=useState([])

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

                <Filters 
                    openFilters={openFilters} 
                    setOpenFilters={setOpenFilters}
                    types={types}
                    setTypes={setTypes}
                    generations={generations}
                    setGenerations={setGenerations}
                    setPokesFilter={setPokesFilter}
                    setBuscando={setBuscando}
                />

                <CardsContent pokesFilter={pokesFilter} generations={generations} types={types} buscando={buscando}/>

                {pokesFilter.length===0 && allPokes.length!==0 &&
                    <div className="paginador">
                        <p onClick={async()=>{
                            await setAllPokes([])
                            await setBuscando(true)
                            await fetch(allPokes.previous).then((res)=>res.json().then((res)=>setAllPokes(res)))
                            setBuscando(false)
                        }}>{allPokes.previous?"...Anterior":""}</p>
                        <p onClick={async()=>{
                            await setAllPokes([])
                            await setBuscando(true)
                            await fetch(allPokes.next).then((res)=>res.json().then((res)=>setAllPokes(res)))
                            setBuscando(false)
                        }}>{allPokes.next?"Siguiente...":""}</p>
                    </div>
                }

                <div className={`fondoAlt ${openFilters?"open":"close"}`} onClick={()=>setOpenFilters(!openFilters)}></div>
            </div>
    )
}