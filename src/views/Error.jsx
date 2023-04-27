import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/rocketTeam.svg"
import banner404 from "../assets/404.svg"
import { UseApiContext } from "../context/ApiContext";

export default function Error(){
    const {isTablet}=useContext(UseApiContext)

    const navigate=useNavigate()

    return(
        <div className={`error-container ${isTablet&&"tablet"}`}>
            <img src={banner} alt="ERROR" />
            <img src={banner404} alt="ERROR" className="banner404"/>
            <p>The rocket team</p>
            <p className="p2">has won this time.</p>
            <p className="button" onClick={()=>navigate("/")}>Return</p>
        </div>
    )
}