import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  UseApiContext } from "../context/ApiContext";
import banner from "../assets/banner.svg"
import SearchIcon from '@mui/icons-material/Search';
import { SvgIcon } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Pokedex(){

    return(
        <>
            <div className="pokedex-container">
                <p className="banner">800 <span>Pokemons</span> for you to choose your favorite</p>
                <div className="buscador">
                    <input type="text" placeholder="Encuentra tu pokemon..."/>
                    <SvgIcon component={SearchIcon} className="buscador-logo"/>
                </div>
                <div className="filtros">
                    <p>Filtros</p>
                    <SvgIcon component={FilterListIcon} className="filtros-logo"/>
                </div>
            </div>
            <div className={`filtros-drop`}></div>
        </>
    )
}