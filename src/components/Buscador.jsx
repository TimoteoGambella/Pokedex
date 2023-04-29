import { SvgIcon } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Swal from "sweetalert2";
import { useContext } from "react";
import { UseApiContext } from "../context/ApiContext";

export default function Buscador({setTypes,setGenerations,setBuscando,lupa,pokesFilterBuscador,setPokesFilterBuscador}){
    const { isTablet, isDesktop } = useContext(UseApiContext)

    const buscador=async()=>{
        if(document.getElementById("buscador").value!==""){
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
                    setTypes("")
                    setGenerations("")
                    setPokesFilterBuscador(newArray)
                }
            }))
            setBuscando(false)
        }
    }

    return(
        <>
            <div className={`buscador ${isTablet&&"tablet"} ${isDesktop&&"desktop"}`}>
                <div>
                    <input id="buscador" type="text" placeholder="Encuentra tu pokemon ..." onKeyPress={(e)=>{
                        if(e.key==="Enter" && e.target.value.length>=3){
                            buscador()
                        }
                    }}/>
                    <SvgIcon component={SearchIcon} className="buscador-logo" sx={{zIndex:lupa?-1:0}} onClick={()=>buscador()}/>
                </div>
            </div>
            {pokesFilterBuscador.length!==0 &&
                <p className={`limpiarBuscador ${isTablet&&"tablet"}`} onClick={()=>{document.getElementById("buscador").value="";setPokesFilterBuscador([])}}>Limpiar buscador</p>
            }
        </>
    )
}