export default function SecondInfo({pokeInfo}){
    return(
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
    )
}