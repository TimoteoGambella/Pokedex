import { useEffect, useState } from "react"
import { colorsType } from '../context/colors';
import close from "../assets/closeIcon.svg"
import FirstInfo from "./infoCards/FirstInfo";
import SecondInfo from "./infoCards/SecondInfo";
import ThirdInfo from "./infoCards/ThirdInfo";
import FourthInfo from "./infoCards/FourthInfo";

export default function CardPokeView({pokeInfo,setPokeView}){
    const [carga,setCarga]=useState(false)
    const [cargaOverflow,setCargaOverflow]=useState(true)

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

            <FirstInfo pokeInfo={pokeInfo}/>
            <SecondInfo pokeInfo={pokeInfo}/>
            <ThirdInfo pokeInfo={pokeInfo}/>
            <FourthInfo pokeInfo={pokeInfo}/>
        </div>
    )
}