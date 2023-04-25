export default function FourthInfo({pokeInfo}){
    let arrayStat=["Attack","Defense","special-attack","special-defense"]
    return(
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
    )
}