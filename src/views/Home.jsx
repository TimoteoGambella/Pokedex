import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.svg"
import { useContext } from "react";
import { UseApiContext } from "../context/ApiContext";
import { useMediaQuery } from "@mui/material";

export default function Home(){
    const navigate=useNavigate()
    const {isTablet}=useContext(UseApiContext)

    const newBanner=useMediaQuery("(min-width:1300px)")

    return(
        <div className={`home-container ${isTablet&&"tablet"}`}>
            {!newBanner ?
                <>
                    <img src={banner} alt="BANNER"/>
                    <h2><span>Find</span> all your favorite <span>Pokemon</span></h2>
                    <h3>You can know the type of Pokemon, its strengths, disadvantages and abilities</h3>
                    <p onClick={()=>navigate("/pokedex")}>See Pokemons</p>
                </>
                :
                <div className="newBanner">
                    <div>
                        <h2><span>Find</span> all your favorite <span>Pokemon</span></h2>
                        <h3>You can know the type of Pokemon, its strengths, disadvantages and abilities</h3>
                        <p onClick={()=>navigate("/pokedex")}>See Pokemons</p>
                    </div>
                    <img src={banner} alt="BANNER"/>
                </div>
            }
        </div>
    )
}