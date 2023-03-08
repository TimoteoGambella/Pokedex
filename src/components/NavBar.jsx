import { useState } from "react";
import logo from "../assets/logo.svg"

export default function NavBar(){
    const [menuBar,setMenuBar]=useState(true)
    const [openMenu,setOpenMenu]=useState(false)

    return(
        <div className="navbar-container">
            <img src={logo} alt="LOGO" />

            <button className={`hamburger hamburger--stack ${openMenu&&"active"}`} type="button"
                    onClick={()=>{
                        window.scrollTo({
                            top: 0,
                            behavior: "auto",
                        });
                        setOpenMenu(!openMenu)
                    }}
                >
                    <div className="inner"
                        onClick={()=>{
                            if(window.location.pathname==="/Contact" && menuBar){
                                setMenuBar(false)
                            }else if(window.location.pathname==="/Contact" && !menuBar){
                                setMenuBar(true)
                            }
                        }}
                    >
                        <span className={`bar ${menuBar&&"bar2"}`}></span>
                        <span className={`bar ${menuBar&&"bar2"} ${menuBar&&"bar2-background"}`}></span>
                        <span className={`bar ${menuBar&&"bar2"}`}></span>
                    </div>
                </button>

        </div>
    )
}