import { useContext, useEffect, useState } from "react";
import { SvgIcon } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Filters from "../components/Filters";
import CardsContent from "../components/CardsContent";
import { UseApiContext } from "../context/ApiContext";
import Buscador from "../components/Buscador";
import Paginador from "../components/Paginador";
import Select from "react-dropdown-select";

export default function Pokedex({openMenu}){
    const { allPokes,allTypes,isTablet,isDesktop,apiPoke } = useContext(UseApiContext)

    const [openFilters,setOpenFilters]=useState(false)
    const [lupa,setLupa]=useState(false)
    const [types,setTypes]=useState("")
    const [generations,setGenerations]=useState("")

    const [buscando,setBuscando]=useState(false)
    const [pokesFilter,setPokesFilter]=useState([])
    const [pokesFilterBuscador,setPokesFilterBuscador]=useState([])

    const [FT,setFT]=useState(false)

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
        if(FT){
            setFT(false)
            buscadorFiltros()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openMenu,lupa,FT])
    
    const buscadorFiltros=async()=>{
        await setBuscando(true)
        if(types!==""||generations!==""){
            document.getElementById("buscador").value=""
            setPokesFilterBuscador([])
            if(types===""&&generations!==""){
                await setPokesFilter([])
                await apiPoke(`https://pokeapi.co/api/v2/generation/${generations}`).then((res)=>setPokesFilter(res))
            }else if(types!==""&&generations===""){
                await setPokesFilter([])
                await apiPoke(`https://pokeapi.co/api/v2/type/${types}`).then((res)=>setPokesFilter(res))
            }else{
                await setPokesFilter([])
                await apiPoke(`https://pokeapi.co/api/v2/generation/${generations}`).then((res)=>setPokesFilter(res))
            }
        }else{
            await setPokesFilter([])
        }
        setBuscando(false)
    }

    return(
            <div className={`pokedex-container ${isTablet&&!isDesktop?"tablet":isDesktop?"desktop":""}`}>
                <p className="banner">800 <span>Pokemons</span> for you to choose your favorite</p>

                <Buscador setTypes={setTypes} setGenerations={setGenerations} setBuscando={setBuscando} lupa={lupa} pokesFilterBuscador={pokesFilterBuscador} setPokesFilterBuscador={setPokesFilterBuscador}/>

                {!isTablet ?
                    <>
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
                            buscadorFiltros={buscadorFiltros}
                        />
                    </>
                    :
                    <div>
                        {allTypes.length!==0 &&
                            <Select
                                options={allTypes}
                                labelField="name"
                                valueField="name"
                                searchable={true}
                                onChange={async(values) => {
                                    setTypes(values[0].name)
                                    setFT(true)
                                }}
                            />
                        }
                    </div>
                }


                <CardsContent pokesFilterBuscador={pokesFilterBuscador} pokesFilter={pokesFilter} generations={generations} types={types} buscando={buscando}/>


                {pokesFilter.length===0 && pokesFilterBuscador.length===0 && allPokes.length!==0 &&
                    <Paginador setBuscando={setBuscando}/>
                }

                <div className={`fondoAlt ${openFilters?"open":"close"}`} onClick={()=>setOpenFilters(!openFilters)}></div>
            </div>
    )
}