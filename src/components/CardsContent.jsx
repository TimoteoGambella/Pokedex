import { Fragment, useContext, useEffect } from "react"
import { UseApiContext } from "../context/ApiContext"
import CardPoke from "./CardPoke"
import loader from "../assets/load1.gif"
import { useMediaQuery } from "@mui/material"
import Swal from "sweetalert2"

export default function CardsContent({setPokesFilter,pokesFilter,generations,types,buscando,pokesFilterBuscador}){
    const {allPokes,isTablet,isDesktop}=useContext(UseApiContext)

    const maxContent=useMediaQuery("(min-width:1900px)")

    useEffect(() => {
        if(pokesFilter.length!==0){
            if(pokesFilter.pokemon_species!==undefined&&pokesFilter.pokemon_species.length===0){
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'We did not find results. Try different name.',
                })
                setPokesFilter([])
            }else if(pokesFilter.pokemon!==undefined&&pokesFilter.pokemon.length===0){
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'We did not find results. Try different name.',
                })
                setPokesFilter([])
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokesFilter]);

    return(
        <div className={`cards-container ${isTablet&&"tablet"} ${isDesktop&&"desktop"} ${maxContent&&"maxContent"}`}>
            {(allPokes.length===0 || buscando) ?
                <div className="loader">
                    <img src={loader} alt="LOADER"/>
                </div>
            :
                <>
                    {pokesFilter.length===0 && pokesFilterBuscador.length===0 && allPokes.length!==0 && allPokes.results.map((obj,i)=>{
                        return(
                            <Fragment key={i}>
                                <CardPoke poke={obj} i={i+1===allPokes.results.length}/>
                            </Fragment>
                        )
                    })}
                    {pokesFilter.length!==0 && pokesFilterBuscador.length===0 && pokesFilter.pokemon_species !== undefined && pokesFilter.pokemon_species.map((obj,i)=>{
                        return(
                            <Fragment key={i}>
                                <CardPoke poke={obj} i={i+1===pokesFilter.pokemon_species.length} generations={generations} types={types} />
                            </Fragment>
                        )
                    })}
                    {pokesFilter.length!==0 && pokesFilterBuscador.length===0 && pokesFilter.pokemon !== undefined && pokesFilter.pokemon.map((obj,i)=>{
                        return(
                            <Fragment key={i}>
                                <CardPoke poke={obj} i={i+1===pokesFilter.pokemon.length}/>
                            </Fragment>
                        )
                    })}
                    {pokesFilterBuscador.length !==0 && pokesFilterBuscador.map((obj,i)=>{
                        return(
                            <Fragment key={i}>
                                <CardPoke poke={obj} i={i+1===pokesFilterBuscador.length}/>
                            </Fragment>
                        )
                    })}
                </>
            }

        </div>
    )
}