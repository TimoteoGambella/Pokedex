import { createContext, useEffect, useState } from 'react';
import { colorsType } from './colors';
import { useMediaQuery } from "@mui/material";

export const UseApiContext = createContext();

export const ApiContext = ({ children }) => {
    const isTablet=useMediaQuery("(min-width:768px)")
    const isDesktop=useMediaQuery("(min-width:1440px)")

    const [allPokes,setAllPokes]=useState([])
    const [allTypes,setAllTypes]=useState([])
    const [allGenerations,setAllGenerations]=useState([])
    const [page,setPage]=useState(0)

    const apiPoke=async(url)=>{
        let data = {}
        await fetch(url).then((res)=>res.json().then((res)=>data=res))
        return data
    }

    useEffect(() => {
        if(allPokes.length===0){
            apiPoke(`https://pokeapi.co/api/v2/pokemon`).then((res)=>setAllPokes(res))
        }
        if(allTypes.length===0){
            apiPoke(`https://pokeapi.co/api/v2/type`).then((res)=>{
                let newArray=[]
                for (const key in res.results) {
                    newArray.push({name:res.results[key].name})
                }
                setAllTypes(newArray)
            })
        }
        if(allTypes.length===0){
            apiPoke(`https://pokeapi.co/api/v2/generation`).then((res)=>setAllGenerations(res))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <UseApiContext.Provider value={{ isTablet,isDesktop, colorsType, apiPoke, allPokes, page, setPage, allTypes, allGenerations, setAllPokes }}>
            {children}
        </UseApiContext.Provider>
    );
};