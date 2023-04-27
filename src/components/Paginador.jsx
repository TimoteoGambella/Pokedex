import { useContext } from "react"
import { UseApiContext } from "../context/ApiContext"


export default function Paginador({setBuscando}){
    const { allPokes, setAllPokes, isTablet, isDesktop } = useContext(UseApiContext)

    return(
        <>
            <div className={`paginador ${isTablet&&!isDesktop?"tablet":isDesktop?"desktop":""}`}>
                <p  style={{padding:allPokes.previous?"10px 20px":""}}
                    onClick={async()=>{
                        document.getElementById("buscador").value=""
                        await setAllPokes([])
                        await setBuscando(true)
                        await fetch(allPokes.previous).then((res)=>res.json().then((res)=>setAllPokes(res)))
                        setBuscando(false)
                    }}
                >{allPokes.previous?"Anterior":""}</p>
                
                <p  style={{padding:allPokes.next?"10px 20px":""}}
                    onClick={async()=>{
                        document.getElementById("buscador").value=""
                        await setAllPokes([])
                        await setBuscando(true)
                        await fetch(allPokes.next).then((res)=>res.json().then((res)=>setAllPokes(res)))
                        setBuscando(false)
                    }}
                >{allPokes.next?"Siguiente":""}</p>
            </div>
        </>
    )
}