import { SvgIcon } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Buscador({buscador,lupa,pokesFilterBuscador,setPokesFilterBuscador}){
    return(
        <>
            <div className="buscador">
                <input id="buscador" type="text" placeholder="Encuentra tu pokemon..." onKeyPress={(e)=>{
                    if(e.key==="Enter" && e.target.value.length>=3){
                        buscador()
                    }
                }}/>
                <SvgIcon component={SearchIcon} className="buscador-logo" sx={{zIndex:lupa?-1:0}} onClick={()=>buscador()}/>
            </div>
            {pokesFilterBuscador.length!==0 &&
                <p className="limpiarBuscador" onClick={()=>setPokesFilterBuscador([])}>Limpiar buscador</p>
            }
        </>
    )
}