import { Fragment } from "react"
import { colorsType } from "../../context/colors"

export default function FirstInfo({pokeInfo}){
    return(
        <div className="firstInfo">
            <div className="box1">
                {pokeInfo.id}
            </div>
            <div className="box2">
                {pokeInfo.types.map((obj,i)=>{
                    return(
                        <Fragment key={i}>
                            {i<2 &&
                                <div style={{backgroundColor:colorsType.find(e=>e.name===obj.type.name).color}}>
                                    {obj.type.name[0].toUpperCase()}{obj.type.name.slice(1)}
                                </div>
                            }
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}