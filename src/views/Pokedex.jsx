import { useContext, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { SvgIcon } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Filters from "../components/Filters";
import CardsContent from "../components/CardsContent";
import { UseApiContext } from "../context/ApiContext";
import Swal from "sweetalert2";

export default function Pokedex({openMenu}){
    const { allPokes, setAllPokes } = useContext(UseApiContext)

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
                <div className="buscador">
                    <input id="buscador" type="text" placeholder="Encuentra tu pokemon..." onKeyPress={(e)=>{
                        if(e.key==="Enter" && e.target.value.length>=3){
                            buscador()
                        }
                    }}/>
                    <SvgIcon component={SearchIcon} className="buscador-logo" sx={{zIndex:lupa?-1:0}} onClick={()=>buscador()}/>
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
                    setPokesFilterBuscador={setPokesFilterBuscador}
                />

                <CardsContent pokesFilterBuscador={pokesFilterBuscador} pokesFilter={pokesFilter} generations={generations} types={types} buscando={buscando}/>

                {pokesFilter.length===0 && pokesFilterBuscador.length===0 && allPokes.length!==0 &&
                    <div className="paginador">
                        <p  style={{padding:allPokes.previous?"10px 20px":""}}
                            onClick={async()=>{
                                document.getElementById("buscador").value=""
                                await setAllPokes([])
                                await setBuscando(true)
                                await fetch(allPokes.previous).then((res)=>res.json().then((res)=>setAllPokes(res)))
                                setBuscando(false)
                            }}
                        >{allPokes.previous?"Anterior":""}</p>
                        
                        <p  style={{padding:allPokes.next?"10px 20px":""}}
                            onClick={async()=>{
                                document.getElementById("buscador").value=""
                                await setAllPokes([])
                                await setBuscando(true)
                                await fetch(allPokes.next).then((res)=>res.json().then((res)=>setAllPokes(res)))
                                setBuscando(false)
                            }}
                        >{allPokes.next?"Siguiente":""}</p>
                    </div>
                }

                <div className={`fondoAlt ${openFilters?"open":"close"}`} onClick={()=>setOpenFilters(!openFilters)}></div>
            </div>
    )
}