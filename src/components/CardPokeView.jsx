import { useContext, useEffect, useState } from "react"
import { colorsType } from '../context/colors';
import close from "../assets/closeIcon.svg"
import FirstInfo from "./infoCards/FirstInfo";
import SecondInfo from "./infoCards/SecondInfo";
import ThirdInfo from "./infoCards/ThirdInfo";
import FourthInfo from "./infoCards/FourthInfo";
import { UseApiContext } from "../context/ApiContext"

export default function CardPokeView({pokeInfo,setPokeView}){
    const { isTablet,isDesktop } = useContext(UseApiContext)

    const [carga,setCarga]=useState(false)

    useEffect(() => {
        if(!carga){
            setTimeout(() => {
               setCarga(true) 
            }, 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className={`cardPokeView-container ${carga?"open":"close"} ${isTablet&&!isDesktop?"tablet":isDesktop?"desktop":""}`}
            style={{
                background:`linear-gradient(180deg, ${colorsType.find(e=>e.name===pokeInfo.types[0].type.name).color} 20%, black)`,
                overflow:"hidden"
            }}
        >
            <img src={close} alt="CROSS" className="closeIcon" onClick={()=>{
                setCarga(false)
                setTimeout(() => {
                    setPokeView(false)
                }, 2000);
            }}/>

            {!isTablet ?
                <>
                    <h1>{pokeInfo.name[0].toUpperCase()}{pokeInfo.name.slice(1)}</h1>
                    <img src={pokeInfo.sprites.front_default} alt="FOTO" className="pokeFoto"/>
                </>
                :
                <div style={{display:"flex",alignItems:"center"}}>
                    <h1>{pokeInfo.name[0].toUpperCase()}{pokeInfo.name.slice(1)}</h1>
                    <img src={pokeInfo.sprites.front_default} alt="FOTO" className="pokeFoto"/>
                </div>
            }

            <FirstInfo pokeInfo={pokeInfo}/>
            <SecondInfo pokeInfo={pokeInfo}/>
            <ThirdInfo pokeInfo={pokeInfo}/>
            <FourthInfo pokeInfo={pokeInfo}/>
        </div>
    )
}