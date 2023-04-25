import { useEffect } from "react"
import { useState } from "react"

export default function Legendarios(){

    let arrayLegendarios=[
            "articuno","zapdos","moltres","mewtwo","mew",
            "raikou","entei","suicune","lugia","ho-oh","celebi",
            "regirock","regice","registeel","latias","latios","kyogre","groudon","rayquaza","jirachi","deoxys",
            "heatran","cresselia","regigigas","uxie","mesprit","azelf","dialga","palkia","giratina","phione","manaphy","darkrai","shaymin","arceus",
            "virizion","cobalion","terrakion","tornadus","thundurus","landorus","reshiram","zekrom","kyurem","victini","meloetta","genesect","keldeo",
            "xerneas","yveltal","zygarde","diancie","hoopa","volcanion",
            "silvally","tapu koko","tapu lele","tapu bulu","tapu fini","cosmog","cosmoem","solgaleo","lunala","necrozma","magearna","marshadow","zeraora","meltan","melmetal",
            "kubfu","urshifu","glastrier","spectrier","regieleki","regidrago","enamorus","zacian","zamazenta","eternatus","calyrex","zarude",
            "ting-lu","chien-pao","wo-chien","chi-yu","koraidon","miraidon"
    ]
    const [legendarios,setLegendarios]=useState([])

    const [cargando,setCargando]=useState(true)

    // useEffect(() => {
    //     if(legendarios.length===0){
    //         fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=99999`).then((res)=>res.json().then(async(res)=>{
    //             for (const key in res) {
    //                 if (Object.hasOwnProperty.call(object, key)) {
    //                     const element = object[key];
                        
    //                 }
    //             }
    //             // for (const key in arrayLegendarios) {
    //             //     for (const key2 in arrayLegendarios[key].array) {
    //             //         console.log(arrayLegendarios[key].array[key2])
    //             //     }
    //             // }
    //         }))
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return(
        <div className="legendarios-container">

        </div>
    )
}