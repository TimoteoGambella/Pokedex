import { useState } from "react";
import logo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom";

export default function NavBar(){
    const [menuBar,setMenuBar]=useState(true)
    const [openMenu,setOpenMenu]=useState(false)

    const navigate=useNavigate()

    const navegador=(param)=>{
        setOpenMenu(false)
        navigate(`/${param}`)
    }

    return(
        <div className="navbar-container">
            <img onClick={()=>navegador("")} src={logo} alt="LOGO" />

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
                <div className={`menu ${openMenu?"open":"close"}`}>
                    <img onClick={()=>navegador("")} src={logo} alt="LOGO" />
                    <div>
                        <p onClick={()=>navegador("pokedex")}>Pokedex</p>
                        <p>Legendarios</p>
                        <p>Sobre mí</p>
                    </div>
                </div>
                <div className={`fondoMenu ${openMenu?"open":"close"}`} onClick={()=>setOpenMenu(!openMenu)}></div>
        </div>
    )
}