import { Fragment, useContext } from "react"
import { UseApiContext } from "../context/ApiContext"
import CardPoke from "./CardPoke"
import loader from "../assets/load1.gif"

export default function CardsContent({pokesFilter,generations,types}){
    const { allPokes } = useContext(UseApiContext)

    return(
        <div className="cards-container">
            {allPokes.length===0 ?
                <div className="loader">
                    <img src={loader} alt="LOADER"/>
                </div>
                :
                <>
                    {pokesFilter.length===0 && allPokes.length!==0 && allPokes.results.map((obj,i)=>{
                        return(
                            <Fragment key={i}>
                                <CardPoke poke={obj} i={i+1===allPokes.results.length}/>
                            </Fragment>
                        )
                    })}
                    {pokesFilter.length!==0 && pokesFilter.pokemon_species !== undefined && pokesFilter.pokemon_species.map((obj,i)=>{
                        return(
                            <Fragment key={i}>
                                <CardPoke poke={obj} i={i+1===allPokes.results.length} generations={generations} types={types} />
                            </Fragment>
                        )
                    })}
                    {pokesFilter.length!==0 && pokesFilter.pokemon !== undefined && pokesFilter.pokemon.map((obj,i)=>{
                        return(
                            <Fragment key={i}>
                                <CardPoke poke={obj} i={i+1===allPokes.results.length}/>
                            </Fragment>
                        )
                    })}
                </>
            }

        </div>
    )
}