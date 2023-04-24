import { Fragment, useEffect, useState } from "react"
import { colorsType } from '../context/colors';
import close from "../assets/closeIcon.svg"
import ProgressBar from "@ramonak/react-progress-bar";

export default function CardPokeView({pokeInfo,setPokeView}){
    const [carga,setCarga]=useState(false)
    const [cargaOverflow,setCargaOverflow]=useState(true)

    let hp_base_max=255
    let xp_base_max=635

    let arrayStat=["Attack","Defense","special-attack","special-defense"]

    useEffect(() => {
        if(!carga){
            setTimeout(() => {
               setCarga(true) 
            }, 100);
            setTimeout(() => {
                setCargaOverflow(false)
            }, 2000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
console.log(pokeInfo)
    return(
        <div className={`cardPokeView-container ${carga?"open":"close"}`}
            style={{
                background:`linear-gradient(180deg, ${colorsType.find(e=>e.name===pokeInfo.types[0].type.name).color} 20%, black)`,
                overflow:cargaOverflow?"hidden":"scroll"
            }}
        >
            <img src={close} alt="CROSS" className="closeIcon" onClick={()=>{
                setCarga(false)
                setTimeout(() => {
                    setPokeView(false)
                }, 2000);
            }}/>

            <h1>{pokeInfo.name[0].toUpperCase()}{pokeInfo.name.slice(1)}</h1>
            <img src={pokeInfo.sprites.front_default} alt="FOTO" className="pokeFoto"/>

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
            <div className="secondInfo">
                <p>Abilities</p>
                <div>
                    {pokeInfo.abilities.map((obj,i)=>{
                        return(
                            <p key={i}
                                style={{
                                    marginRight:i!==i+1!==pokeInfo.abilities.length&&"2px",
                                    marginLeft:i!==0&&"2px"
                                }}
                            >{obj.ability.name[0].toUpperCase()}{obj.ability.name.slice(1)}{i+1!==pokeInfo.abilities.length&& " --"}</p>
                        )
                    })}
                </div>
            </div>
            <div className="thirdInfo">
                <div>
                    <p className="title">Helthy Points</p>
                    <div>
                        <p>{pokeInfo.stats[0].base_stat}</p>
                        <ProgressBar height="8px" labelColor="transparent" baseBgColor="#F6F7F9" bgColor="linear-gradient(270deg, #64D368 0.15%, #64D368 70.88%)" completed={`${Math.trunc(pokeInfo.stats[0].base_stat/hp_base_max*100)}`}/>
                    </div>
                </div>
                <div>
                    <p className="title">Experience</p>
                    <div>
                        <p>{pokeInfo.base_experience}</p>
                        <ProgressBar height="8px" labelColor="transparent" baseBgColor="#F6F7F9" bgColor="linear-gradient(180deg, #F5DB13 0%, #F2B807 100%)" completed={`${Math.trunc(pokeInfo.base_experience/xp_base_max*100)}`}/>
                    </div>
                </div>
            </div>
            <div className="fourthInfo">
                {arrayStat.map((obj,i)=>{
                    return(
                        <div key={i}>
                            <p className="circle">{pokeInfo.stats[i+1].base_stat}</p>
                            <p className="stat">{obj==="special-defense"?"SP Defense":obj==="special-attack"?"SP Attack":obj}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}