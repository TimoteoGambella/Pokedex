import { useContext, useEffect, useState } from "react";
import { SvgIcon } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Filters from "../components/Filters";
import CardsContent from "../components/CardsContent";
import { UseApiContext } from "../context/ApiContext";
import Swal from "sweetalert2";
import Buscador from "../components/Buscador";
import Paginador from "../components/Paginador";

export default function Pokedex({openMenu}){
    const { allPokes } = useContext(UseApiContext)

    const [openFilters,setOpenFilters]=useState(false)
    const [lupa,setLupa]=useState(false)
    const [types,setTypes]=useState("")
    const [generations,setGenerations]=useState("")

    const [buscando,setBuscando]=useState(false)
    const [pokesFilter,setPokesFilter]=useState([])
    const [pokesFilterBuscador,setPokesFilterBuscador]=useState([])

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

    const buscador=async()=>{
        await setPokesFilterBuscador([])
        await setBuscando(true)
        await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=99999`).then((res)=>res.json().then(async(res)=>{
            let newArray=[]
            for (const key in res.results) {
                if (res.results[key].name.indexOf(document.getElementById("buscador").value)!==-1) {
                    newArray.push(res.results[key])
                }
            }
            if(newArray.length===0){
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'We did not find results. Try different name.',
                  })
            }else{
                setPokesFilterBuscador(newArray)
            }
        }))
        setBuscando(false)
    }

    return(
            <div className="pokedex-container">
                <p className="banner">800 <span>Pokemons</span> for you to choose your favorite</p>

                <Buscador buscador={buscador} lupa={lupa} pokesFilterBuscador={pokesFilterBuscador} setPokesFilterBuscador={setPokesFilterBuscador}/>

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
                    setPokesFilterBuscador={setPokesFilterBuscador}
                />

                <CardsContent pokesFilterBuscador={pokesFilterBuscador} pokesFilter={pokesFilter} generations={generations} types={types} buscando={buscando}/>


                {pokesFilter.length===0 && pokesFilterBuscador.length===0 && allPokes.length!==0 &&
                    <Paginador setBuscando={setBuscando}/>
                }

                <div className={`fondoAlt ${openFilters?"open":"close"}`} onClick={()=>setOpenFilters(!openFilters)}></div>
            </div>
    )
}