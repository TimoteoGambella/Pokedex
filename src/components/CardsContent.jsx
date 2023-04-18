import { Fragment, useContext, useState } from "react"
import { UseApiContext } from "../context/ApiContext"
import CardPoke from "./CardPoke"

export default function CardsContent(){
    const { allPokes } = useContext(UseApiContext)
    const [cargando,setCargando]=useState(true)

    return(
        <div className="cards-container">
            {allPokes.length!==0 && allPokes.results.map((obj,i)=>{
                return(
                    <Fragment key={i}>
                        <CardPoke poke={obj} i={i+1===allPokes.results.length} setCargando={setCargando}/>
                    </Fragment>
                )
            })}
        </div>
    )
}