import { createContext, useEffect, useState } from 'react';
import { colorsType } from './colors';

export const UseApiContext = createContext();

export const ApiContext = ({ children }) => {

    const [allPokes,setAllPokes]=useState([])
    const [allTypes,setAllTypes]=useState([])
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
            apiPoke(`https://pokeapi.co/api/v2/type`).then((res)=>setAllTypes(res))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
console.log(allPokes)
console.log(allTypes)
    return (
        <UseApiContext.Provider value={{ colorsType, apiPoke, allPokes, page, setPage, allTypes }}>
            {children}
        </UseApiContext.Provider>
    );
};