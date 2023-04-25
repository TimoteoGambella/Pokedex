import { SvgIcon } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Swal from "sweetalert2";

export default function Buscador({setBuscando,lupa,pokesFilterBuscador,setPokesFilterBuscador}){

    const buscador=async()=>{
        await setPokesFilterBuscador([])
        await setBuscando(true)
        await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=99999`).then((res)=>res.json().then(async(res)=>{
            let newArray=[]
            for (const key in res.results) {
                if (res.results[key].name.indexOf(document.getElementById("buscador").value.toLowerCase())!==-1) {
                    newArray.push(res.results[key])
                }
            }
            if(newArray.length===0){
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'We did not find results. Try different name.',
                })
                document.getElementById("buscador").value=""
            }else{
                setPokesFilterBuscador(newArray)
            }
        }))
        setBuscando(false)
    }

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
                <p className="limpiarBuscador" onClick={()=>{document.getElementById("buscador").value="";setPokesFilterBuscador([])}}>Limpiar buscador</p>
            }
        </>
    )
}