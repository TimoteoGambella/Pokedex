import { useContext, useEffect, useState } from "react";
import { SvgIcon } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuFilters from "../components/MenuFilters";
import CardsContent from "../components/CardsContent";
import { UseApiContext } from "../context/ApiContext";
import Buscador from "../components/Buscador";
import Paginador from "../components/Paginador";
import Select from "react-dropdown-select";

export default function Pokedex({openMenu}){
    const { allPokes,allTypes,allGenerations,isTablet,isDesktop,apiPoke } = useContext(UseApiContext)

    const [openFilters,setOpenFilters]=useState(false)
    const [lupa,setLupa]=useState(false)
    const [types,setTypes]=useState("")
    const [generations,setGenerations]=useState("")

    const [buscando,setBuscando]=useState(false)
    const [pokesFilter,setPokesFilter]=useState([])
    const [pokesFilterBuscador,setPokesFilterBuscador]=useState([])

    const [FT,setFT]=useState(false)
    const [renderInput,setRenderInput]=useState(true)

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
        if(!renderInput){
            setRenderInput(true)
            buscadorFiltros()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openMenu,lupa,FT,renderInput])
    
    useEffect(() => {
        if(isTablet || !isTablet){
            setTypes("")
            setGenerations("")
            setPokesFilter([])
        }
    }, [isTablet])

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
                        <div className="filtrosM">
                            <p onClick={()=>setOpenFilters(!openFilters)}>Filtros</p>
                            <SvgIcon component={FilterListIcon} className="filtros-logo" onClick={()=>setOpenFilters(!openFilters)}/>
                        </div>
                        <MenuFilters 
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
                    <div className="filtrosT">
                        {allTypes.length!==0 && renderInput &&
                            <Select
                                className="inputsFilters"
                                options={allTypes}
                                labelField="name"
                                valueField="name"
                                searchable={true}
                                placeholder="Type"
                                onChange={async(values) => {
                                    setTypes(values[0].name.toLowerCase())
                                    setFT(true)
                                }}
                            />
                        }
                        {allGenerations.length!==0 && renderInput &&
                            <Select
                                className="inputsFilters"
                                options={allGenerations}
                                labelField="name"
                                valueField="name"
                                searchable={true}
                                placeholder="Generation"
                                onChange={async(values) => {
                                    setGenerations(values[0].name.toLowerCase())
                                    setFT(true)
                                }}
                            />
                        }
                        {isTablet&&
                            <p onClick={()=>{
                                if(types.length!==0 || generations.length!==0){
                                    setOpenFilters(false)
                                    setPokesFilter([])
                                    setTypes("")
                                    setGenerations("")
                                    setRenderInput(false)
                                }
                            }} style={{textDecoration:"underline",cursor:"pointer"}}>Limpiar Filtros</p>
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