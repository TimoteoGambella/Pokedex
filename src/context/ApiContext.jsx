import { createContext, useEffect, useState } from 'react';
import { colorsType } from './colors';

export const UseApiContext = createContext();

export const ApiContext = ({ children }) => {

    const [allPokes,setAllPokes]=useState([])
    const [page,setPage]=useState(0)

    const apiPoke=async(url)=>{
        let data = {}
        await fetch(url).then((res)=>res.json().then((res)=>data=res))
        return data
    }

    useEffect(() => {
        if(allPokes.length===0){
            apiPoke(`https://pokeapi.co/api/v2/pokemon/?name=clef`).then((res)=>setAllPokes(res))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <UseApiContext.Provider value={{ colorsType, apiPoke, allPokes, page, setPage }}>
            {children}
        </UseApiContext.Provider>
    );
};