import { useContext } from "react";
import logo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom";
import { UseApiContext } from "../context/ApiContext";

export default function NavBar({openMenu,setOpenMenu}){
    const {isTablet,isDesktop}=useContext(UseApiContext)

    const navigate=useNavigate()

    let href = window.location.pathname

    const navegador=(param)=>{
        setOpenMenu(false)
        navigate(`/${param}`)
    }

    return(
        <>
            {(href==="/"||href==="/pokedex") && 
                <div className={`navbar-container ${isTablet&&"tablet"} ${isDesktop&&"desktop"}`}>
                    <img onClick={()=>navegador("")} src={logo} alt="LOGO"/>

                    {!isTablet && !isDesktop ?
                        <>
                            <button className={`hamburger hamburger--stack ${openMenu&&"active"}`} type="button"
                            onClick={()=>{
                                window.scrollTo({
                                    top: 0,
                                    behavior: "auto",
                                });
                                setOpenMenu(!openMenu)
                            }}
                            >
                                <div className="inner">
                                    <span className={`bar bar2`}></span>
                                    <span className={`bar bar2 bar2-background`}></span>
                                    <span className={`bar bar2`}></span>
                                </div>
                            </button>
                            <div className={`menu ${openMenu?"open":"close"}`}>
                                <img onClick={()=>navegador("")} src={logo} alt="LOGO" />
                                <div>
                                    <p onClick={()=>navegador("pokedex")}>Pokedex</p>
                                    <p onClick={()=>window.open("timoteogambella.com.ar")}>Sobre mí</p>
                                </div>
                            </div>
                            <div className={`fondoAlt ${openMenu?"open":"close"}`} onClick={()=>setOpenMenu(!openMenu)}></div>
                        </>
                    :isTablet && 
                        <div>
                            <p onClick={()=>navegador("")} style={{borderBottom:window.location.pathname==="/"&&"3.5px solid black"}}>Home</p>
                            <p onClick={()=>navegador("pokedex")} style={{borderBottom:window.location.pathname==="/pokedex"&&"3.5px solid black"}}>Pokedex</p>
                            <p onClick={()=>window.open("https://www.timoteogambella.com.ar/","_blank")}>Sobre mí</p>
                        </div>
                    }
                </div>
            }
        </>
    )
}