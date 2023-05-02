import ProgressBar from "@ramonak/react-progress-bar";

export default function ThirdInfo({pokeInfo}){
    let hp_base_max=255
    let xp_base_max=635
    return(
        <div className="thirdInfo">
            <div>
                <p className="title">Healthy Points</p>
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
    )
}