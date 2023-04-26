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


    useEffect(() => {
        if(legendarios.length===0){
            fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=99999`).then((res)=>res.json().then(async(res)=>{
                let newArray=[]
                for (const key in res.results) {
                    if(arrayLegendarios.indexOf(res.results[key].name)!==-1){
                        newArray.push(res.results[key].name)
                    }else{
                        console.log(res.results[key].name)
                    }
                }
                setLegendarios(newArray)
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return(
        <div className="legendarios-container">

        </div>
    )
}